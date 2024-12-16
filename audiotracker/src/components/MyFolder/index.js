import React, { useState } from "react";
import { FaCheckSquare, FaRegFolder, FaRegSquare } from "react-icons/fa";

export const MyFolder = ({ nomePasta }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex items-center justify-between w-[90%]">
      <div className="flex flex-row items-center gap-[11px]">
        <FaRegFolder style={{ width: 29, height: 29, color: "#D8A353" }} />
        <h1 className="text-[18px]">{nomePasta}</h1>
      </div>
      <button onClick={() => setIsSelected(!isSelected)}>
        {isSelected ? (
          <FaCheckSquare style={{ width: 25, height: 25 }} />
        ) : (
          <FaRegSquare style={{ width: 25, height: 25 }} />
        )}
      </button>
    </div>
  );
};

export const FriendsFolder = ({ nomePessoa }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex items-center justify-between w-[90%]">
      <div className="flex flex-row items-center gap-[11px]">
        <div className="border-solid border-2 border-[#258b2e] rounded-[100px] w-[25px] h-[25px]"></div>
        <h1 className="text-[18px]">{nomePessoa}</h1>
      </div>
      <button onClick={() => setIsSelected(!isSelected)}>
        {isSelected ? (
          <FaCheckSquare style={{ width: 25, height: 25 }} />
        ) : (
          <FaRegSquare style={{ width: 25, height: 25 }} />
        )}
      </button>
    </div>
  );
};