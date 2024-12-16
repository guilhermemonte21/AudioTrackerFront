import {createContext, useState} from "react";

export const AudioContext = createContext(null);

export const AudioProvider = ({chidren}) =>{
    const [audioData, setAudioData] = useState(null); // armazena os dados do audio selecionado

    return(
        <AudioContext.Provider value={{audioData, setAudioData}}>
            {chidren}
        </AudioContext.Provider>
    )
}