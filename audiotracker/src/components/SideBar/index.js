import { public_url } from "../../configs/index";
import { FaUserFriends } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { IoIosArrowForward, IoIosSettings } from "react-icons/io";
import { ButtonImportar } from "../Button";
import { useLocation } from "react-router-dom";
import DriveLogin from "../DriveLogin";
import { useEffect, useState } from "react";
import { ModalFiles } from "../Modal/index.js";

export function SideBar({ getAllFile }) {
  const links = [
    {
      icon: <RiHome2Line size={24} />,
      children: "Arquivos",
      name: "/arquivos",
    },
    {
      icon: <FaUserFriends size={24} />,
      children: "Compartilhar",
      name: "/compartilhar",
    },
    {
      icon: <IoIosSettings size={24} />,
      children: "Configurações",
      name: "/configuracoes",
    },
  ];

  const [state, setState] = useState(false);

  useEffect(() => {
    if (getAllFile) {
      getAllFile();
    }
  }, [state, getAllFile]);

  const local = useLocation();

  return (
    <>
      <aside className="w-[20%] bg-[#152259] h-screen flex flex-col items-center justify-between pb-16">
        {/* Logo Section */}
        <div className="flex items-center justify-center w-full h-36 border-b-[0.5px] border-[#BDBDBD]">
          <img
            className="w-[80%] lg:w-[80%] justify-center"
            src="/assets/img/logo.svg"
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="w-full mb-36">
          {links.map((link, index) => (
            <LinkAside
              key={index}
              icon={link.icon}
              className={link.name === local.pathname ? "bg-[#509CDB]" : ""}
              to={link.name}
            >
              {link.children}
            </LinkAside>
          ))}
        </div>

        {/* File Import Button */}
        <ButtonImportar state={state} setState={setState} />
      </aside>

      {/* Modal Files */}
      <ModalFiles visible={state} setVisible={setState} />
    </>
  );
}

export const LinkAside = ({ icon, children, className, to }) => (
  <div
    className={`flex items-center w-full h-[46px] rounded mt-[25px] xl:hover:pl-[30px] transition-all ${className}`}
  >
    <a
      className="flex items-center gap-[16px] text-white lg:text-[15px] xl:text-[18px] ml-[30px]"
      href={to}
    >
      {icon} {children} <IoIosArrowForward size={24} />
    </a>
  </div>
);
