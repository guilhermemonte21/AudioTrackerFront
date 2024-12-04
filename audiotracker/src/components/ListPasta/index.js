import React from 'react'
import { FaRegFolder } from 'react-icons/fa'
import { api } from '../../services/apiService'

export const ListPasta = ({nomePasta, DeleteFolder}) => {
  return (
    <div className='mb-[40px] flex items-center justify-between w-[80%]'>
    <div className='flex flex-row items-center gap-[11px]'>
      <FaRegFolder style={{
        width:29,
        height:29,
        color:'#D8A353'
      }}/>
      
      <h1 className='text-[18px]'>{nomePasta}</h1>
    </div>
    <button onClick={DeleteFolder}>

    <h1 className='text-[#F11919] text-[18px]'>Remover</h1>
    </button>
  </div>
  )
}
export default ListPasta;







