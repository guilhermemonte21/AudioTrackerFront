import { Text, Time } from "../Text";
import { formatDuration } from "../../services/formatService";
import { useEffect } from "react";

export const Timestamp = ({ obj, search, onClick }) => {
    const toReplace = `<span class="text-[#318CCE] font-semibold">${search}</span>`;
    const replace = obj.value.toLocaleLowerCase().replace(search, toReplace);

    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    useEffect(() => {
        document.getElementById(`selected-text-${obj.key}`).innerHTML = replace;
    }, [obj]);

    return removeAccents(obj.value.toUpperCase().trim()).includes(removeAccents(search.trim().toUpperCase())) && (
        <div
            className="cursor-pointer border-2 border-[#EAECF0] h-fit w-full rounded px-[36px] py-[14px] flex items-center gap-10"
            onClick={onClick}
        >
            <Time>{obj.key}</Time>
            <Text>
                <span id={`selected-text-${obj.key}`}>{obj.value}</span>
            </Text>
        </div>
    );
};
