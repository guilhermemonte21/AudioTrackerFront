import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegFolder } from 'react-icons/fa';
import ListPasta from '../ListPasta';

function AccordionMenu({folder ,DeleteFolder}) {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura/fechamento
    const [selectedOption, setSelectedOption] = useState(''); // Estado para armazenar a opção selecionada

    const toggleMenu = () => {
        setIsOpen(!isOpen);  // Alterna entre aberto e fechado
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Atualiza a opção selecionada
        setIsOpen(false);           // Fecha o menu após seleção
    };

    return (
        <div className="mb-[40px] flex flex-col items-start gap-[10px]">
            <div className='flex flex-row items-center gap-[5px] mb-[10px]'>
                <div className="border-solid border-2 border-[#258b2e] rounded-[100px] w-[45px] h-[45px]"></div>
                <h1>Matheus Lima</h1>
                {/* Botão de alternância da seta */}
                <button
                    onClick={toggleMenu}
                    className="flex items-center gap-[5px] p-2 rounded-md"
                >
                    <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
            </div>
            <div className='pl-[10px] w-[100%]'>
            {/* Conteúdo do menu */}
            {isOpen && (
              
                <div className='flex flex-row items-center gap-[11px]'>
                    <FaRegFolder style={{
                    width:29,
                    height:29,
                    color:'#D8A353'
                     }}/>
      
      <h1 className='text-[18px]'>Dados</h1>
    </div>
              ) }
            </div>


            {/* Exibe a opção selecionada
            {selectedOption && (
                <div className="mt-2 p-2 border-2 border-[#258b2e] rounded-md">
                    <span>Selecionado: {selectedOption}</span>
                </div>
            )} */}
        </div>
    );
}

export default AccordionMenu;
