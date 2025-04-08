// src/components/Common/GameButton.tsx

import React from "react";

interface GameButtonProps {
  text: string;
  onClick: () => void;
}

const GameButton: React.FC<GameButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GameButton;
