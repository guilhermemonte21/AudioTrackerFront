import React, {useContext} from 'react'
import {CiLogout} from "react-icons/ci";
import {Link} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";

const Header = () => {
    const {user, setUser} = useContext(UserContext)

    return (
        <div className="flex-shrink-0">
        <div
            className='py-2 border-solid border-2 border-[#CFCFCF] justify-end items-center w-[100%] flex flex-row pr-[70px] gap-[18px] mb-[49px]'>
            <div className='rounded-[100px]'>
                <img className={`w-9 rounded-[100px]`} src={`${localStorage.getItem(`foto`)}`} alt=""/>
            </div>

            <Link onClick={() => setUser(null)} to={'/login'}>
                <CiLogout style={{
                    width: 36,
                    height: 36,
                    color: 'red'
                }}/>
            </Link>
        </div>
        </div>
    )
}

export default Header;
