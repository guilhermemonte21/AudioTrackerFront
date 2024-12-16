import React, { useContext } from 'react';
import { Bars } from 'react-loader-spinner';
import { GoogleLoginButton } from "../../components/GoogleLogin";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const { setUser } = useContext(UserContext)

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-tr from-blue-800 to-blue-950 px-4">
            <img
                src={'/assets/img/logo.png'}
                alt="logo do site"
                className="lg:w-23 lg:h-23 sm:w-15 sm:h-15"
            />
            <h2 className="max-w-xs text-center text-[12px] text-white sm:max-w-md sm:text-sm/[17px] lg:max-w-lg lg:text-2xl">
                Bem-vindo! Encontre informações valiosas em cada palavra, com pesquisa rápida e precisa.
            </h2>
            <GoogleLoginButton setUser={setUser} />
            <Bars
                height={80}
                width={80}
                color="#318CCE"
                ariaLabel="loading"
            />
        </div>
    )
}
