import {LinkUploadArea, TextUploadArea} from "../Text";

export const UploadArea = ({}) => {
    return (
        <div className={`
            w-[90%] h-[336px] 
            bg-[#15225908] 
            border-2 border-dashed border-[#152259] 
            self-center
            flex items-center justify-center
            `}>
            <TextUploadArea>
                solte a pasta para fazer o upload ou
                <LinkUploadArea>clique para adicionar</LinkUploadArea>
            </TextUploadArea>
        </div>
    );
}