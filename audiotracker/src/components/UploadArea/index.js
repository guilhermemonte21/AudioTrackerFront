import { LinkUploadArea, TextUploadArea } from "../Text";
import { useState } from "react"
import { ModalFiles } from "../Modal";

export const UploadArea = ({ getAllFile }) => {
    const [state, setState] = useState(false);
    return (
        <>
            <div onClick={() => setState(true)} className="flex items-center justify-center w-full">
                <label
                    className={`
        flex flex-col items-center justify-center 
        w-[90%] h-[336px] 
        bg-[#15225908] 
        border-2 border-dashed border-[#152259] 
        self-center 
        cursor-pointer
        hover:bg-gray-100
        `}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Clique para fazer o upload</span>
                        </p>
                    </div>
                </label>
            </div>

            <ModalFiles visible={state} setVisible={setState} getAllFile={getAllFile} />
        </>

    );
}