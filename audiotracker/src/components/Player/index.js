import WavesurferPlayer from "@wavesurfer/react";
import { ButtonPlay } from "../Button";

export const Player = ({ status, time, duration, onClick, path, onReady }) => {
    return (
        <div
            className={`h-[50px] px-6 py-8 flex items-center gap-5 bg-[#152259] rounded-full text-white`}
            id={`play-container`}
        >
            <ButtonPlay onClick={onClick} status={status} />

            <div>
                {time} / {duration}
            </div>
        </div>
    );
};
