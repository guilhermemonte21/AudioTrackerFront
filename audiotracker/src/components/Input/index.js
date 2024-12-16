import { FaSearch } from "react-icons/fa";

export const SelectFolder = ({ folders, manipulationFunction }) => (
  <select
    defaultValue="Default"
    onChange={manipulationFunction}
    className="bg-transparent lg:text-[15px] xl:text-[19px] font-semibold"
  >
    <option disabled value="Default">Escolha uma pasta</option>
    {folders?.map((folder, index) => (
      < option key = { folder.id } value = { index } >
      { folder.autorPasta !== localStorage.nome ? folder.nomePasta + " - " + folder.autorPasta  : folder.nomePasta}
      </option>
))}
  </select >
);

export const Search = ({ className, search, setSearch }) => (
  <div
    className={`w-[60%] h-[50px] border-2 rounded-full flex items-center justify-between gap-5 px-5 ${className}`}
  >
    <input
      type="text"
      className="w-full h-full bg-transparent text-[18px] outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <FaSearch color="#D1D1D1" />
  </div>
);