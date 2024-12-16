import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { Table } from "../../components/Table";
import { ContainerMain, ContainerSection, GridLayout } from "../../components/Container";
import { Search, SelectFolder } from "../../components/Input";
import Header from "../../components/Header";
import { api } from "../../services/apiService";
import { UploadArea } from "../../components/UploadArea";

export function Home() {
  const [pastaRefData, setPastaRefData] = useState([]);
  const [indexData, setIndexData] = useState(null);
  const [search, setSearch] = useState("");
  
  console.log(localStorage)

  const fetchData = async () => {
    try {
      // Obtém os compartilhamentos e filtra por nome do autor (autorNome igual ao nome no localStorage)
      const compartilharResponse = await api.get(`/Compartilhar/ListarTodos`);
      const compartilhadosFiltrados = compartilharResponse.data.filter(
        (item) => item.autorNome === localStorage.nome
      );

      // Extrai os IDs únicos das pastas compartilhadas
      const pastaIdsCompartilhados = [...new Set(compartilhadosFiltrados.map((item) => item.pastaRefId))];

      // Obtém as pastas relacionadas (por ID ou nome do criador)
      const foldersResponse = await Promise.all([
        api.get(`/PastaRef/BuscarPorNomeAutor?nomeAutor=${localStorage.nome}`), // Pastas criadas pelo autor
        ...pastaIdsCompartilhados.map((id) => api.get(`/PastaRef?Id=${id}`)), // Pastas relacionadas aos compartilhamentos
      ]);

      // Combina os resultados das pastas e remove duplicados
      const todasPastas = foldersResponse.flatMap((response) => response.data);
      const pastasUnicas = todasPastas.filter(
        (pasta, index, self) => index === self.findIndex((p) => p.id === pasta.id)
      );

      // Adiciona as informações da pasta aos arquivos
      const pastasComArquivos = pastasUnicas.map((pasta) => {
        const arquivosComDados = pasta.arquivos.map((arquivo) => ({
          ...arquivo,
          fotoAutorPasta: pasta.fotoAutorPasta, // Adiciona a URL da foto ao arquivo
          autorPasta: pasta.autorPasta,         // Opcional: nome do autor
        }));
        return { ...pasta, arquivos: arquivosComDados };
      });

      setPastaRefData(pastasComArquivos); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContainerMain>
      <SideBar getAllFile={fetchData} />
      <ContainerSection className="overflow-auto gap-10">
        <Header />
        <GridLayout className="overflow-auto mt-10">
          <div className="flex items-center justify-between w-full gap-12">
            <SelectFolder
              manipulationFunction={(e) => setIndexData(e.target.value)}
              folders={pastaRefData}
            />
            <Search search={search} setSearch={setSearch} />
          </div>

          {pastaRefData.length > 0 ? (
            <Table
              search={search}
              data={
                pastaRefData.length > 0 && indexData !== null 
                  ? pastaRefData[indexData].arquivos // Arquivos da pasta selecionada
                  : pastaRefData.flatMap((pasta) => pasta.arquivos) // Todos os arquivos
              }
            />
          ) : (
            <UploadArea getAllFile={fetchData} />
          )}
        </GridLayout>
      </ContainerSection>
    </ContainerMain>
  );
}
