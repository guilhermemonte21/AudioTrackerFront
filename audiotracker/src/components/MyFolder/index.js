import React, { useState } from "react";
import { FaCheckSquare, FaRegFolder } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";

export const MyFolder = (props) => {
  const [selected, setSelected] = useState(false);
    return (
      <div className=' flex items-center justify-between  w-[90%]'>
      <div className='flex flex-row items-center gap-[11px]'>
        <FaRegFolder style={{
          width:29,
          height:29,
          color:'#D8A353'
        }}/>
        <h1 className='text-[18px]'>{props.nomePasta}</h1>
      </div>
      {
          (selected == false?
          <button onClick={()=> setSelected(true)}>  
        <FaRegSquare style={{width: 25, height:25}}/>
          </button>
          :
          <button onClick={()=>setSelected(false)}>  
        <FaCheckSquare style={{width: 25, height:25}}/>
          </button>
          )
      }
    </div>
    )
  }

  export const FriendsFolder = (props)=>{
    const [selected, setSelected] = useState(false);
    return (
      <div className=' flex items-center justify-between  w-[90%]'>
      <div className='flex flex-row items-center gap-[11px]'>
      <div className="border-solid border-2 border-[#258b2e] rounded-[100px] w-[25px] h-[25px]"></div>
        <h1 className='text-[18px]'>{props.nomePessoa}</h1>
      </div>
      {
          (selected == false?
          <button onClick={()=> setSelected(true)}>  
        <FaRegSquare style={{width: 25, height:25}}/>
          </button>
          :
          <button onClick={()=>setSelected(false)}>  
        <FaCheckSquare style={{width: 25, height:25}}/>
          </button>
          )
      }
    </div>
    )
  }