import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaRegFolder } from 'react-icons/fa';
import { api } from '../../services/apiService';

const AccordionMenu = ({ folder }) => {
    const [sharedFolders, setSharedFolders] = useState([]);
    const [pastaData, setPastaData] = useState([]); 
    const [openMenus, setOpenMenus] = useState({}); 
    const [userList, setUserList] = useState({}); 

    const fetchSharedFolders = async () => {
        if (folder && folder.length > 0) {
            try {
                const responses = await Promise.all(
                    folder.map(element => api.get(`Compartilhar?idPasta=${element.id}`))
                );

                const allSharedFolders = responses.flatMap(response => response.data);
                setSharedFolders(allSharedFolders);
            } catch (error) {
                console.error("Erro ao buscar pastas compartilhadas:", error);
            }
        }
    };

    // Buscar os dados das pastas
    const fetchPastaData = async () => {
        try {
            const response = await api.get('PastaRef');
            setPastaData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados das pastas:", error);
        }
    };

    const fetchUser = async (userName) => {
        try {
            await api.get('Usuario').then(response => setUserList(response.data.find(user => user.nome === userName)));
        } catch (error) {
            console.error("Erro ao buscar dados das pastas:", error);
        }
    };

    useEffect(() => {

        fetchSharedFolders();
        fetchPastaData();

    }, [folder]);

    const toggleMenu = (id) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    return userList && (
        <div className="accordion-menu">
            {sharedFolders.map((sharedFolder) => {
                const folderDetails = pastaData.find(pasta => pasta.id === sharedFolder.pastaRefId);
                fetchUser(sharedFolder.autorNome)

                return folderDetails ? (
                    <div key={sharedFolder.id} className="">
                        {/* Cabeçalho com nome do autor e botão para expandir */}
                        <div
                            className="flex justify-between items-center cursor-pointer mb-2"
                            onClick={() => toggleMenu(sharedFolder.id)}
                        >
                            <div className="flex flex-row items-center gap-[11px]">
                                <img
                                    src={userList.foto}
                                    alt={sharedFolder.autorNome}
                                    className="w-[45px] rounded-full"
                                />
                                <h1 className="text-[18px]">{sharedFolder.autorNome}</h1>
                                {openMenus[sharedFolder.id] ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        </div>

                        {/* Submenu com arquivos internos */}
                        {openMenus[sharedFolder.id] && (
                            <div className="pl-[30px] flex items-end gap-5">
                                <FaRegFolder
                                    style={{
                                        width: 29,
                                        height: 29,
                                        color: "#D8A353",
                                    }}
                                />
                                <h2 className="text-[18px]">{folderDetails.nomePasta}</h2>
                            </div>
                        )}
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default AccordionMenu;
