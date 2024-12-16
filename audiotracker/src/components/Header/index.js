import React, { useContext, useState } from 'react';
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { IoMenuSharp } from "react-icons/io5";
import { SideBar } from '../SideBar';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const [showComponent, setShowComponent] = useState(false);

    const handleToggle = () => {
        setShowComponent(!showComponent);
    };

    return (
        <div className="flex-shrink-0">
            <div className="max-md:w-[100%] py-2 border-solid border-2 border-[#CFCFCF] items-center sm:justify-end sm:w-[100%] flex flex-row pr-[70px] gap-[18px] mb-[49px] pl-8">
                <button onClick={handleToggle} className="sm:hidden">
                    <IoMenuSharp style={{ width: 36, height: 36 }} />
                </button>
                {showComponent && <SideBar />}
                <div className="flex gap-[5px]">
                    <div className="rounded-[100px]">
                        <img className="w-9 rounded-[100px]" src={localStorage.foto} alt="" />
                    </div>
                    <Link onClick={() => localStorage.clear()} to={'/login'}>
                        <CiLogout style={{ width: 36, height: 36, color: 'red' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;