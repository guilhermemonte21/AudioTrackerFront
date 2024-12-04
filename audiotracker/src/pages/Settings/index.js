import React, { useContext, useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import Header from '../../components/Header';
import { Subtitle, TitleSetting } from '../../components/TextSettings';
import AccordionMenu from '../../components/AccordionMenu';
import ListPasta from '../../components/ListPasta';
import { ModalFiles } from "../../components/Modal";
import { api } from '../../services/apiService';
import { UserContext } from '../../contexts/UserContext';

export const Settings = () => {
  const [folder, setFolder] = useState([]);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    GetFolder();
  }, [folder]);

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
      await api.delete(`/PastaRef/${folderId}`);
      setFolder((prevFolders) => prevFolders.filter((item) => item.id !== folderId));
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleDelete = (folderId) => {
    if (window.confirm("Você tem certeza que deseja excluir esta pasta?")) {
      DeleteFolder(folderId);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ModalFiles visible={state} setVisible={setState} />
      <SideBar state={state} setState={setState} />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="overflow-y-auto p-8 ml-[180px]">
          <TitleSetting>Conta</TitleSetting>
          <hr className="w-[790px] mt-4 mb-8" />
          <div className="flex gap-20 mt-[4px] mb-12">
            <article>
              <Subtitle>Google</Subtitle>
              <h2 className="text-[18px]">{localStorage.nome}</h2>
              <h2 className="text-[18px]">{localStorage.email}</h2>
            </article>
            <article>
              <Subtitle>Drive</Subtitle>
              <h2 className="text-[18px]">{localStorage.nome}</h2>
              <h2 className="text-[18px]">{localStorage.email}</h2>
            </article>
          </div>
          <TitleSetting>Pastas</TitleSetting>
          <hr className="w-[790px] mt-4 mb-[12px]" />
          {loading ? (
            <p>Carregando...</p>
          ) : folder.length === 0 ? (
            <p className='mt-[22px] mb-[22px]'>Nenhuma pasta encontrada</p>
          ) : (
            folder.map((item) => localStorage.nome === item.autorPasta && (
              <ListPasta
                key={item.id}
                nomePasta={item.nomePasta}
                DeleteFolder={() => handleDelete(item.id)}
              />
            ))
          )}
          <TitleSetting>Compartilhados</TitleSetting>
          <hr className="w-[790px] mt-4 mb-[12px]" />
          <AccordionMenu folder={folder} DeleteFolder={(id) => handleDelete(id)} />
        </div>
      </div>
    </div>
  );
};
