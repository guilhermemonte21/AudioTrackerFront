import { IoChevronBack } from "react-icons/io5";
import { Search } from '../Input';
import { FaDownload, FaGoogleDrive, FaWindowClose } from "react-icons/fa";
import { api } from "../../services/apiService";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import DriveLogin from '../DriveLogin';
import { UserContext } from '../../contexts/UserContext';
import ListPasta from '../ListPasta';
import { useContext, useEffect, useState } from "react";
import { ButtonModal } from "../Button";

export const Modal = () => {
    const [search, setSearch] = useState("");
    const [showFriendsFolder, setShowFriendsFolder] = useState(false);
    const [folder, setFolder] = useState([]);
    const [state, setState] = useState(false);
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetFolder();
    }, [])



    const GetFolder = async () => {
        try {

            const retornoGet = await api.get(`/PastaRef`);

            setFolder(retornoGet.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const DeleteFolder = async (folderId) => {
        try {
            await api.delete(`/PastaRef/${folderId}`)
            setFolder((prevFolders) => prevFolders.filter((item) => item.id !== folderId));

        } catch (error) {
            alert(error)
            console.log(error)
        }
    }
    const handleDelete = (folderId) => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta pasta?");

        if (confirmDelete) {
            DeleteFolder(folderId);
        }
    };




    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const toggleFolderType = () => {
        if (!showFriendsFolder) {
            setShowFriendsFolder(true);
        }


    };
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="shadow-custom-dark relative pt-[70px] border-2 rounded-[8px] w-[50%] h-[90%] flex flex-col items-center justify-between">
                {showFriendsFolder && (
                    <button onClick={() => setShowFriendsFolder(false)}>
                        <IoChevronBack
                            style={{
                                position: 'absolute',
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

                <hr style={{ borderColor: '#F0F0F0' }} className="w-[529px] mt-[43px] mb-[40px]" />

                <div
                    className="w-[529px] flex-grow overflow-y-auto overflow-x-hidden flex flex-col  items-center justify-start your-scroll-container"
                    style={{
                        maxHeight: 250, 
                        height: 'auto', 
                    }}
                >
                    {loading ? (
                        <p>Carregando...</p>
                    ) : folder.length === 0 ? (
                        <p className='mt-[22px] mb-[22px]'>Nenhuma pasta encontrada</p>
                    ) : (
                        folder.map((item) => localStorage.nome == item.autorPasta && (
                            <ListPasta
                                key={item.id}
                                nomePasta={item.nomePasta}
                                
                            />
                        ))
                    )}

                </div>


                <ButtonModal onClick={toggleFolderType} />
            </div>
        </div>
    );
};

export const ModalDownloadStorage = ({ visible, setVisible }) => {
    const [pasta, setPasta] = useState('');
    const [file, setFile] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const [uploadedCount, setUploadedCount] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const navigate = useNavigate();


    const saveFiles = async (e) => {
        e.preventDefault();

        if (!file || file.length === 0) return;

        setTotalFiles(file.length);
        setUploadedCount(0);
        setIsDisabled(true);

        for (const [index, f] of Array.from(file).entries()) {
            try {
                const formData = new FormData();
                formData.append('fileList', f);

                const config = { headers: { 'content-type': 'multipart/form-data' } };
                await api.post(`/Arquivos?autor=${localStorage.nome}&pastaNome=${pasta}`, formData, config);

                setUploadedCount((prev) => prev + 1);
            } catch (error) {
                console.error(`Erro ao carregar o arquivo ${index + 1}:`, error);
            }
        }

        setIsDisabled(false);
        setVisible(false);
        navigate(`/arquivos`);
    };

    return (
        <div
            className={`flex items-center justify-center bg-[#00000050] w-screen h-screen absolute z-40 top-0 left-0 ${!visible && `hidden`}`}
        >
            <div className={`bg-primary-white w-1/2 rounded p-10 flex flex-col items-center justify-center gap-10`}>
                <div
                    className={`text-xl w-full flex justify-end cursor-pointer`}
                    onClick={() => setVisible(!visible)}
                >
                    <FaWindowClose color={`red`} />
                </div>

                <form
                    className={`w-full flex flex-col items-center justify-center gap-10`}
                    onSubmit={(e) => saveFiles(e)}
                >
                    <input
                        type="text"
                        placeholder={`nome da pasta`}
                        disabled={isDisabled}
                        className={`border-[#000] border-2 w-[80%] px-5 py-2 rounded`}
                        onChange={(e) => setPasta(e.target.value)}
                    />

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
                        onClick={() => setIsDisabled(true)}
                    >
                        {isDisabled ? <Oval height={40} /> : `Transcrever`}
                    </button>
                </form>
            </div>
        </div>
    );
};



export const ModalFiles = ({ visible, setVisible }) => {


    const [isLocal, setIsLocal] = useState(false);

    return (
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

                        <label htmlFor="google-picker" className={`flex items-center gap-5 w-full border-b p-2`}>
                            <FaGoogleDrive size={18} /> Google Drive
                        </label>

                        <button className={`flex items-center gap-5 w-full border-b p-2`}
                            onClick={() => setIsLocal(!isLocal)}>
                            <FaDownload /> Local
                        </button>

                        <DriveLogin />

                        {/*<button*/}
                        {/*    className={`bg-[#152259] px-7 py-3 rounded text-white`}*/}
                        {/*    onClick={() => setIsDisabled(true)}*/}
                        {/*>*/}
                        {/*    {isDisabled ? <Oval height={40} /> : `Transcrever`}*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
            <ModalDownloadStorage visible={isLocal} setVisible={setIsLocal} />
        </>
    );
}
