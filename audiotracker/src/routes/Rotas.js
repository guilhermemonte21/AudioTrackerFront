import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
  } from "react-router-dom";
  import { Home } from "../pages/Home";
  import { Share } from "../pages/Share";
  import { VisualizarAudio } from "../pages/VisualizarAudio";
  import { Settings } from "../pages/Settings";
  import { useContext, useEffect } from "react";
  import Login from "../pages/Login";
  import { UserContext } from "../contexts/UserContext";
  import React from "react";
  
  export const RotasPrivadas = (props) => {
    const isLoggedIn = localStorage.getItem("token");
  
    return isLoggedIn === null ? <Navigate to={"/login"} /> : props.children;
  };
  
  export default function Rotas() {
    return (
      <Routes>
        <Route
          path={`/arquivos`}
          element={
            <RotasPrivadas>
              <Home />
            </RotasPrivadas>
          }
        />
        <Route
          path={`/compartilhar`}
          element={
            <RotasPrivadas>
              <Share />
            </RotasPrivadas>
          }
        />
        <Route
          path={`/configuracoes`}
          element={
            <RotasPrivadas>
              <Settings />
            </RotasPrivadas>
          }
        />
        <Route
          path={`/visualizar-audio`}
          element={
            <RotasPrivadas>
              <VisualizarAudio />
            </RotasPrivadas>
          }
        />
        <Route path={`/login`} element={<Login />} />
      </Routes>
    );
  }
  