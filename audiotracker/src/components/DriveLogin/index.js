import React, { useState, useContext } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import { api } from '../../services/apiService';

const DriveLogin = ({ getAllFiles, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const CLIENT_ID = process.env.REACT_APP_KEY;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [openPicker] = useDrivePicker();

  // Função para fechar o modal
  const handleClose = () => {
    setVisible();
  };

  // POST para registrar os arquivos e criar descrições
  const registerFilesInDatabase = async (file) => {
    try {
      setLoading(true);

      const fileAutor = localStorage.getItem('nome');
      const foto = localStorage.getItem('foto');
      const id = file.id;

      const response = await api.post(
        `Arquivos/DrivePasta?folderId=${id}&autor=${fileAutor}&foto=${foto}`
      );
      getAllFiles()

      const resultados = response.data.resultados || [];
      console.log('Arquivos registrados:', resultados);

      // Criar descrições para cada arquivo
      for (const element of resultados) {
        try {
          await api.post(`/Descricao?arquivoId=${element.arquivoId}`);
          getAllFiles()
        } catch (error) {
          console.error(`Erro ao criar descrição para o arquivo ${element.arquivoId}:`, error);
        }
      }

      // Atualizar a lista de arquivos
      getAllFiles();
    } catch (error) {
      console.error('Erro ao registrar o arquivo:', error.response?.data || error.message);
    } finally {
      setLoading(false);
      handleClose(); // Fecha o modal após a operação
    }
  };

  // Abrir o seletor do Google Drive
  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: 'FOLDERS',
      token: localStorage.getItem('token'),
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      setSelectFolderEnabled: true,
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          console.log('Arquivos selecionados:', data.docs);
          // Processar cada arquivo/pasta selecionado
          data.docs.forEach(registerFilesInDatabase);
        } else if (data.action === 'cancel') {
          console.log('Seleção cancelada pelo usuário.');
          handleClose(); // Fecha o modal se o usuário cancelar
        }
      },
    });
  };

  return (
    <div className="flex align-center">
      {loading ? (
        'Carregando...'
      ) : (
        <button
          onClick={() => {
            handleOpenPicker()
            setVisible()
          }}
          style={{ opacity: loading ? 0.6 : 1 }}
          id="google-picker"
        >
        </button>
      )}

      {/* Spinner Condicional */}
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default DriveLogin;
