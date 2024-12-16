import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from '../../services/apiService';
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginButton = ({ setUser }) => {
    const clientId = process.env.REACT_APP_KEY;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <CustomButtonLogin />
        </GoogleOAuthProvider>
    );
}

export const CustomButtonLogin = () => {
    const navigate = useNavigate();
    const [googleStatus, setGoogleStatus] = useState(false);

    const authentication = async accessToken => {
        const response = await api.post(`Auth/Login`, accessToken, {
            headers: {
                "Content-type": "application/json"
            }
        });

        localStorage.setItem(`jwt_token`, response.data.token);
        navigate(`/arquivos`);
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            setGoogleStatus(tokenResponse);
            localStorage.setItem(`token`, tokenResponse.access_token);
        },
        onError: () => navigate(`/`),
        scope: "profile email",
        include_granted_scopes: true

    });

    useEffect(() => {
        if (googleStatus) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleStatus.access_token}`, {
                headers: {
                    Authorization: `Bearer ${googleStatus.access_token}`,
                    Accept: 'application/json'
                }

            }).then(res => {
                localStorage.setItem('foto', res.data.picture);
                localStorage.setItem('nome', res.data.name);
                localStorage.setItem('email', res.data.email);

                authentication(googleStatus.access_token);
            })
                .catch(error => navigate(`/`))
        }
    }, [googleStatus]);

    return (
        <button
            className={`w-3/4 flex items-center sm:p-[30px] justify-center md:gap-5 bg-primary-white lg:w-[30%] sm:[w-90%] h-[50px] rounded-full  sm:gap-[2px] gap-5`}
            onClick={() => login()}
        >
            <FcGoogle size={32} /> Acessar com o Google
        </button>
    )
}