import { IoChevronBack } from "react-icons/io5";
import { Search } from '../Input';
import { FaDownload, FaGoogleDrive, FaRegFolder, FaWindowClose } from "react-icons/fa";
import { api } from "../../services/apiService";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ButtonModal } from "../Button";
import DriveLogin from "../DriveLogin";
import { useEffect, useState } from "react";

export const Modal = () => {
  const [search, setSearch] = useState("");
  const [showFriendsFolder, setShowFriendsFolder] = useState(false);
  const [folder, setFolder] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);
  const [sharedUsers, setSharedUser] = useState([]);
  const [sharedFolders, setSharedFolders] = useState([]);

  const navigate = useNavigate()

  const GetFolder = async () => {
    try {
      const retornoGet = await api.get(
        `PastaRef/BuscarPorNomeAutor?nomeAutor=${localStorage.getItem(`nome`)}`
      );
      setFolder(retornoGet.data);
    } finally {
      setLoading(false);
    }
  };

  const GetUsers = async () => {
    const response = await api.get(`Usuario`);
    setUsers(response.data);
  };

  const searchByData = (data, type = ``) => {
    if (type === `folder`)
      return data.filter((x) =>
        x.nomePasta.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

    return data.filter((x) =>
      x.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const compartilharPastas = async () => {
    const formData = new FormData();

    for (const user of sharedUsers) {
      formData.append(`usuarios`, user);
    }

    for (const folder of sharedFolders) {
      formData.append(`idPastas`, folder);
    }

    await api
      .post("Compartilhar", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  const toggleFolderType = async () => {
    if (showFriendsFolder === false) {
      setShowFriendsFolder(true);
      return;
    }

    await compartilharPastas();
    navigate("/arquivos")
  };

  useEffect(() => {
    GetFolder();
    GetUsers();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="shadow-custom-dark relative p-10 border-2 rounded-[8px] w-[40%] h-[75%] flex flex-col items-center justify-between">
        {showFriendsFolder && (
          <button onClick={() => {
            setShowFriendsFolder(false)
            setSharedFolders([])
            setSharedUser([])
          }}>
            <IoChevronBack
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                marginTop: 20,
                marginLeft: 20,
                height: 30,
                width: 30,
              }}
            />
          </button>
        )}
        <Search search={search} setSearch={setSearch} />

        <hr
          style={{ borderColor: "#F0F0F0" }}
          className="w-[90%] my-8"
        />

        <div
          className="w-[529px] flex-grow overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start your-scroll-container"
          style={{
            maxHeight: 250,
            height: "auto",
          }}
        >
          {!showFriendsFolder
            ? (
              searchByData(folder, `folder`).length > 0
                ? searchByData(folder, `folder`).map(
                  (item, index) =>
                    localStorage.getItem(`nome`) === item.autorPasta && (
                      <div
                        key={index}
                        id="box-pastas"
                        className={`w-[90%] flex justify-between items-center mb-3`}
                      >
                        <div className="flex gap-5 items-end">
                          <FaRegFolder
                            style={{
                              width: 29,
                              height: 29,
                              color: "#D8A353",
                            }}
                          />
                          <label htmlFor={`check-pasta-${index}`}>
                            {item.nomePasta}
                          </label>
                        </div>
                        <input
                          className="w-5 h-5 border-2 border-gray-500 rounded-md bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition-all duration-200"
                          type="checkbox"
                          id={`check-pasta-${index}`}
                          onClick={(e) => {
                            const res = sharedFolders.find((x) => x === item.id);

                            setChecked(!checked);
                            if (res === undefined) {
                              sharedFolders.push(item.id);
                            } else {
                              sharedFolders.find((x, i) =>
                                x === item.id ? sharedFolders.splice(i, 1) : null
                              );
                            }
                          }}
                        />
                      </div>
                    )
                )
                : <p className="text-gray-500">Nenhuma pasta disponível.</p>
            )
            : (
              searchByData(users).length > 0
                ? searchByData(users).map(
                  (item, index) =>
                    item.nome !== localStorage.nome && (
                      <div
                        key={index}
                        id="box-users"
                        className={`w-[90%] flex justify-between items-center`}
                      >
                        <div className="flex items-end gap-5">
                          <img src={item.foto} className="w-10 rounded-[50px]" alt="" />
                          <label htmlFor={`check-user-${index}`}>{item.nome}</label>
                        </div>

                        <input
                          className="w-5 h-5 border-2 border-gray-500 rounded-md bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition-all duration-200"
                          type="checkbox"
                          id={`check-user-${index}`}
                          checked={
                            sharedUsers.find((x) => x === item.nome) !== undefined
                          }
                          onClick={(e) => {
                            const res = sharedUsers.find((x) => x === item.nome);

                            setChecked(!checked);

                            if (res === undefined) {
                              sharedUsers.push(item.nome);
                            } else {
                              sharedUsers.find((x, i) =>
                                x === item.nome ? sharedUsers.splice(i, 1) : null
                              );
                            }
                          }}
                        />
                      </div>
                    )
                )
                : <p className="text-gray-500">Nenhum usuário disponível.</p>
            )}
        </div>

        <ButtonModal disabled={showFriendsFolder ? !sharedUsers.length > 0 : !sharedFolders.length > 0} text={showFriendsFolder ? "Concluir" : "Adicionar"} onClick={toggleFolderType} />
      </div>
    </div>
  );
};


export const ModalDownloadStorage = ({ visible, setVisible, setModalFileVisible, getAllFile }) => {
  const [file, setFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const saveFiles = async (e) => {
    e.preventDefault();

    if (!file || file.length === 0) return;

    setTotalFiles(file.length);
    setUploadedCount(0);
    setIsDisabled(true);
    setVisible(false);
    setModalFileVisible(false);

    // Armazene os IDs dos arquivos após o upload
    const fileIds = [];

    for (const [index, f] of Array.from(file).entries()) {
      try {
        const formData = new FormData();
        formData.append("file", f);

        const config = { headers: { 'content-type': 'multipart/form-data' } };
        const response = await api.post(`/Arquivos?autor=${localStorage.nome}&pastaNome=Local&foto=${localStorage.getItem("foto")}`, formData, config);
        fileIds.push(response.data.id);
        setUploadedCount((prev) => prev + 1);
        getAllFile()
      } catch (error) {
        console.error(`Erro ao carregar o arquivo ${index + 1}:`, error);
      }
    }

    // Após todos os arquivos serem carregados, crie a descrição
    for (const id of fileIds) {
      try {
        await api.post(`/Descricao?arquivoId=${id}`);
        getAllFile()
        // Atualize a lista de arquivos após cada descrição
      } catch (error) {
        console.error(`Erro ao criar a descrição para o arquivo ${id}:`, error);
      }
    }

    // Finaliza a operação de upload
    setIsDisabled(false);
    setFile(null);
  };


  return getAllFile && (
    <div
      className={`flex items-center justify-center bg-[#00000050] w-screen h-screen absolute z-40 top-0 left-0 ${!visible && `hidden`}`}
    >
      <div className={`bg-primary-white w-1/2 rounded p-10 flex flex-col items-center justify-center gap-10`}>
        <div
          className={`text-xl w-full flex justify-end cursor-pointer`}
          onClick={() => {
            setVisible(!visible)
            setModalFileVisible(false)
          }}
        >
          <FaWindowClose color={`red`} />
        </div>

        <form
          className={`w-full flex flex-col items-center justify-center gap-10`}
          onSubmit={(e) => saveFiles(e)}
        >
          <input
            type="file"
            disabled={isDisabled}
            onChange={(e) => setFile(e.target.files)}
            multiple={true}
          />

          {totalFiles > 0 && (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="text-sm text-gray-700">
                {uploadedCount}/{totalFiles} arquivos enviados
              </div>
              <progress

                value={uploadedCount}
                max={totalFiles}
                className="w-[80%] h-2 rounded overflow-hidden bg-gray-300"
              />
            </div>
          )}

          <button
            className={`bg-[#152259] px-7 py-3 rounded text-white`}
            onClick={() => {
              setIsDisabled(true)
            }}
          >
            {isDisabled ? <Oval height={40} /> : `Transcrever`}
          </button>
        </form>
      </div>
    </div>
  );
};



export const ModalFiles = ({ visible, setVisible, getAllFile }) => {


  const [isLocal, setIsLocal] = useState(false);

  return getAllFile && (
    <>
      <div
        className={`flex items-center justify-center bg-[#00000050] w-screen h-screen absolute z-40 top-0 left-0 ${!visible && `hidden`}`}
      >
        <div className={`bg-primary-white w-1/2 rounded p-10 flex flex-col items-center justify-center gap-10`}>
          <div className={`text-xl w-full flex justify-end cursor-pointer`}
            onClick={() => setVisible(!visible)}>
            <FaWindowClose color={`red`} />
          </div>

          <div className={`w-full flex flex-col items-center justify-center gap-10`}>

            <label htmlFor="google-picker" className={`flex items-center gap-5 w-full border-b p-2 cursor-pointer`}>
              <FaGoogleDrive size={18} /> Google Drive
            </label>

            <button className={`flex items-center gap-5 w-full border-b p-2`}
              onClick={() => {
                setIsLocal(!isLocal)
              }}>
              <FaDownload /> Local
            </button>

            <DriveLogin setVisible={setVisible} getAllFiles={getAllFile} />
            {/*<button*/}
            {/*    className={`bg-[#152259] px-7 py-3 rounded text-white`}*/}
            {/*    onClick={() => setIsDisabled(true)}*/}
            {/*>*/}
            {/*    {isDisabled ? <Oval height={40} /> : `Transcrever`}*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
      <ModalDownloadStorage visible={isLocal} setVisible={setIsLocal} setModalFileVisible={setVisible} getAllFile={getAllFile} />
    </>
  );
}
