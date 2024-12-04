import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../pages/Home";
import {Share} from "../pages/Share";
import {VisualizarAudio} from "../pages/VisualizarAudio";
import {Settings} from "../pages/Settings";
import {useContext, useEffect} from "react";
import Login from "../pages/Login";
import {UserContext} from "../contexts/UserContext";
import React from "react";


// export const RotasPrivadas = props => {
//     const {user} = useContext(UserContext);
//
//     return user === null ? props.children : <Navigate to={"/login"}/>;
// };

export default function Rotas() {
    return (
        <Routes>
            <Route path={`/arquivos`} element={<Home/>} exact={true}/>
            <Route path={`/compartilhar`} element={<Share/>}/>
            <Route path={`/configuracoes`} element={<Settings/>}/>
            <Route path={`/visualizar-audio/:path`} element={<VisualizarAudio/>}/>
            <Route path={`/login`} element={<Login/>}/>
        </Routes>
    );
}