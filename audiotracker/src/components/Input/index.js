import { FaSearch } from "react-icons/fa";

export const SelectFolder = ({ folders, manipulationFunction }) => {
    return (
        <select onChange={manipulationFunction} className={`bg-transparent lg:text-[15px] xl:text-[19px] font-semibold`}>
            <option disabled selected>Escolha uma pasta</option>
            {
                folders && 
                folders.map((x) => {
                    return (x.autorPasta == localStorage.nome) && (
                        <option key={x.id} value={x.id}>
                            {x.nomePasta}
                        </option>
                    );
                })
            }
        </select>
    );
}

export const Search = ({ className, search, setSearch }) => {
    return (
        <div
            className={`w-[60%] h-[50px] border-2 rounded-full flex items-center justify-between gap-5 px-5 ${className}`}
        >
            <input
                type="text"
                className={`w-full h-full bg-transparent text-[18px] outline-none`}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <FaSearch color={`#D1D1D1`} />
        </div>
    );
}