import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import FavPoke from "../src/components/FavPoke";
import ReactLoading from "react-loading";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]); // => use [] empty array bacause of many favourite Pokemon
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data); // No need ".json" after data because Axios manage it to be .json
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    loadPoke();

    return () => abortController.abort();
  }, [number]); //empty array to run only 1 time
  // add number variables for change value of number variable. Every time we click the function => it will rerun with new variable of number
  console.log(poke);

  const prevPoke = () => {
    // decrease quantity
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    // increase quantity
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    //oldState: รับพารา state ตัวเก่า
    //...oldState: ใช้ spread operator เพื่อสร้าง object ใหม่ไปเก็บค่า pokemon
    //poke: และแสดง pokemon ที่เราเลือก
    setFav((oldState) => [...oldState, poke]);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white ">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {/* {poke?.name} จะแสดงค่า name ของ poke ถ้า poke มีค่า (ไม่ใช่ null หรือ undefined) และถ้า poke ไม่ได้กำหนดค่าหรือมีค่าเป็น null หรือ undefined จะแสดงค่าว่าง */}
          <div>
            {loading ? (
              <ReactLoading
                type="spin"
                color="black"
                height={"20%"}
                width={"20%"}
              />
            ) : (
              <>
                <h1 className="text-5xl">{poke?.name}</h1>
                <button
                  onClick={addFav}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5"
                >
                  Add to favourite
                </button>
                <div>
                  <button
                    onClick={prevPoke}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPoke}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Next
                  </button>
                  <img
                    src={poke?.sprites?.other?.home?.front_default}
                    alt={poke?.name}
                    className="w-full h-[400px]"
                  />
                </div>
                <div>
                  <p className="font-bold text-cyan-500">Skills</p>
                  <ul>
                    {poke?.abilities?.map((abil, idx) => (
                      <li key={idx}>{abil?.ability.name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
          <div>
            <h2 className="text-2xl">Your favourite Pokemon</h2>

            {fav.length > 0 ? (
              <FavPoke fav={fav} />
            ) : (
              <p className="mt-5">No favourite Pokemon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
