import { SideBar } from "./components/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import Rotas from "./routes/Rotas";
import { AudioProvider } from "./contexts/AudioContext";

function App() {
    const local = useLocation();
    const navigate = useNavigate();



    useEffect(() => {
        if (local.pathname === `/`)
            return navigate(`/login`)
    }, []);

    return (
        <UserProvider>
                <Rotas />
        </UserProvider>
    )
}

export default App;
