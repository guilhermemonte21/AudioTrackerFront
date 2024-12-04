import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {decode, encode} from "base-64"
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import {FcGoogle} from "react-icons/fc";


export const GoogleLoginButton = ({setUser}) => {
    const clientId = process.env.REACT_APP_KEY;
    const navigate = useNavigate();
    

    const handleSuccess = token => {
        if (!global.atob) {
            global.atob = decode;
        }

        if (!global.btoa) {
            global.btoa = decode;
        }

        const user = jwtDecode(token);


        localStorage.setItem('foto', user.picture);
        localStorage.setItem('nome', user.name);
        localStorage.setItem('email', user.email);

        console.log(localStorage)
    }
    

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {/*<GoogleLogin*/}
            {/*    shape={`circle`}*/}
            {/*    width={`340px`}*/}
            {/*    onSuccess={(credentialResponse) => {*/}
            {/*        handleSuccess(credentialResponse.credential)*/}
            {/*        navigate(`/arquivos`)*/}
            {/*    }}*/}
            {/*    onError={() => navigate(`/`)}*/}
            {/*/>*/}

            <CustomButtonLogin/>
        </GoogleOAuthProvider>
    );
}

export const CustomButtonLogin = () => {
    const navigate = useNavigate();
    const [googleStatus, setGoogleStatus] = useState(false);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            setGoogleStatus(tokenResponse)
            localStorage.setItem(`token`, tokenResponse.access_token)
        },
        onError: () => navigate(`/`)
    });
    // async function Fectch(access_token) {
    //     const Test = await fetch("https://drive.google.com/uc?export=download&id=1VaGipt4MVmArnkSTNHiTgDQifZzmYWR3", {
    //         method: 'POST',
    //         headers: {
    //           authorization: access_token
    //         },
    //       })
    //     .then(response => console.log(response.json()))
    // }

    useEffect(() => {
        if (googleStatus) {
            // Fectch(googleStatus.access_token)
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleStatus.access_token}`, {
                headers: {
                    Authorization: `Bearer ${googleStatus.access_token}`,
                    Accept: 'application/json'
                }
                
            })
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('foto', res.data.picture);
                    localStorage.setItem('nome', res.data.name);
                    localStorage.setItem('email', res.data.email);
                    console.log(localStorage)
                    navigate(`/arquivos`);
                })
                .catch(error => navigate(`/`))
        }
    }, [googleStatus]);

    return (
        <button
            className={`flex items-center justify-center gap-5 bg-primary-white w-[350px] h-[50px] rounded-full`}
            onClick={() => login()}
        >
            <FcGoogle size={32}/> Acessar com o Google
        </button>
    )
}