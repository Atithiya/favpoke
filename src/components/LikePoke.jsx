import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function LikePoke() {
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((check) => !check);
  };

  return (
    <button
      onClick={toggleLike}
      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5"
    >
      {like ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}

export default LikePoke;
