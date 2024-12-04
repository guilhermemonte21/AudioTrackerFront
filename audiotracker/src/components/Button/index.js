import {FaPause, FaPlay} from "react-icons/fa6";
// import DriveLogin from "../DriveLogin";
import DriveLogin from "../DriveLogin";

export const ButtonImportar = ({state, setState}) => {
    return (
        <button
            className={`
                   w-[75%] h-[50px] rounded 
                   bg-[#318CCE] text-[#F4FAFB] text-[20px] 
                   flex items-center justify-center 
                   cursor-pointer
            `}
            onClick={() => setState(!state)}
        >
            Importar
        </button>
    );
}

export const ButtonPagination = props => {
    return (
        <button
            onClick={props.onClick}
            className={`border-2 rounded-xl h-[47px] px-10 hover:bg-[#D9D9D920] transition-all ${props.className}`}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export const ButtonPlay = ({onClick, status, setStatus}) => {
    return (
        <button onClick={onClick}>
            {status ? <FaPause size={30} color={`#F4FAFB`}/> : <FaPlay size={30} color={`#F4FAFB`}/>}
        </button>
    )
}

export const ButtonModal = ({onClick}) => {
    return (

        <button
            className="mt-[56px] mb-[10px] w-[40%] h-[54px] bg-complementary-blue rounded-[8px] text-white text-[18px]"
            onClick={onClick}
        >
            Adicionar
        </button>
    )
}