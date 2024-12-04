import React, { useContext } from 'react';
import { Bars } from 'react-loader-spinner';
import { GoogleLoginButton } from "../../components/GoogleLogin";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext);

    return (
        <div
            className='flex items-center flex-col justify-center gap-10'
            style={{
                background: 'linear-gradient(to top right, #2A44B3, #172562)',
                width: '100vw',
                height: '100vh'
            }}
        >
            <img src={'/assets/img/logo.png'} alt='logo do site' className='w-23 h-23' />
            <h2 className='text-custom-lg text-orange-50 w-[596px] text-center'>
                Bem-vindo! Encontre informações valiosas em cada palavra, com pesquisa rápida e precisa.
            </h2>
            <GoogleLoginButton setUser={setUser} />
            <div className='flex items-center justify-center flex-row'>
                <Bars
                    height="100"
                    width="100%"
                    color='#318CCE'
                    ariaLabel="bars-loading"
                    visible={true}
                />
            </div>
        </div>
    );
};

export default Login;
