import React, { useState, useEffect, useContext } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import { api } from '../../services/apiService';
import { UserContext } from '../../contexts/UserContext';

const DriveLogin = () => {
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  
  const [file, setFile] = useState(null);

  const { user } = useContext(UserContext);

  const fetchFileFromDrive = async (fileId) => {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.blob(); // Retorna o arquivo como Blob
  };

  //FUNCAO DE POST
  const registerFilesInDatabase = async (files) => {
    try {
      for (const file of files) {
       
        const fileId = file.id;
        const fileAutor = localStorage.nome;
        const Url = file.url;
        const pasta = "Drive";
       
        const response = await api.post(`Arquivos/BaixandoDoDrive?fileId=${fileId}&autor=${fileAutor}&pastaNome=${pasta}&path=${Url}`);
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error.response?.data || error.message);
    }
  };
  
  const CLIENT_ID = process.env.REACT_APP_KEY;
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SCOPE = ['https://www.googleapis.com/auth/drive.file'];


  const onPickerApiLoad = () => {
    setPickerApiLoaded(true);
  };

  // const handleAuthResult = (authResult) => {
  //   if (authResult && !authResult.error) {
  //     setAuthToken(authResult.access_token);
  //   } else {
  //     console.error('Erro na autenticação:', authResult.error);
  //   }
  // };

  

  const [openPicker, authResponse] = useDrivePicker(); 
  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: "DOCS",
      token: localStorage.getItem('token'), 
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      setSelectFolderEnabled: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {

        //O QUE EU ADICIONEI!!!
        if (data.action === 'picked') {
          const files = data.docs.map((file) => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            url: `https://drive.google.com/uc?id=${file.id}`,
            size: file.sizeBytes,
          }));

          // Chamar o backend
          if(files.length >0 ){
            registerFilesInDatabase(files);
            // fetch('https://drive.google.com/u/1/uc?id=<uniqueId>&export=download', {
            //   method: 'POST',
            //   headers: {
            //     authorization: process.env.REACT_APP_API_KEY
            //   },
            // }).then(response=> console.log(response.json()))
       
          }
        }
          //TERMINA AQUI!!!

        else if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }

  

   
    
  return (
    
// Input Picker
<button
          type="file"
          id={`google-picker`}
          hidden={true}
          onClick={handleOpenPicker}
          onChange={e => setFile(e.target.files)}
          multiple={true}
      />
  );

};

export default DriveLogin;