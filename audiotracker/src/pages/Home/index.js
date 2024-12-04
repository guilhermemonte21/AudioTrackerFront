import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { Table } from "../../components/Table";
import { ContainerMain, ContainerSection, GridLayout } from "../../components/Container";
import { Search, SelectFolder } from "../../components/Input";
import Header from "../../components/Header";
import { api } from "../../services/apiService";

export function Home() {
  const [data, setData] = useState(null);
  const [pastaRefData, setPastaRefData] = useState(null);
  const [selectPastaRef, setSelectPastaRef] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const [filesResponse, foldersResponse] = await Promise.all([
        api.get("/Arquivos"),
        api.get("/PastaRef"),
      ]);
      setData(filesResponse.data);
      setPastaRefData(foldersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContainerMain>
      <SideBar getAllFile={fetchData} />
      <ContainerSection className="overflow-auto">
        <Header />
        {
          pastaRefData ?
            (<GridLayout className="overflow-auto mt-10">
              <div className="flex items-center justify-between w-full gap-12">
                <SelectFolder
                  manipulationFunction={(e) => setSelectPastaRef(e.target.value)}
                  folders={pastaRefData}
                />
                <Search search={search} setSearch={setSearch} />
              </div>
              <Table search={search} pastaRefId={selectPastaRef} data={data} />
            </GridLayout>) : (<>
            </>)
        }
      </ContainerSection>
    </ContainerMain>
  );
}
