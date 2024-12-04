export const TextUploadArea = props => {
    return (
        <p
            className={`
                flex flex-col items-center 
                text-[24px] text-[#152259] text-center
                w-[40%]`}
        >
            {props.children}
        </p>
    );
}

export const LinkUploadArea = props => {
    return <p className={`border-b-2 border-[#15225980] w-fit cursor-pointer`}>{props.children}</p>;
}

export const Time = props => {
    return <h2 className={`text-[24px] text-[#318CCE]`}>{props.children}</h2>;
}

export const Text = props => {
    return <p className={`text-[18px]`}>{props.children}</p>;
}