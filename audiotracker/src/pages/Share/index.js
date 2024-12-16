import ReactModal from "react-modal";
import Header from "../../components/Header";
import {SideBar} from "../../components/SideBar";
import {useEffect, useState} from "react";
import { Modal, ModalFiles } from "../../components/Modal";

export function Share() {
    useEffect(() => {
        setModalIsOpen(true)
    }, [])
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [state, setState] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <ModalFiles visible={state} setVisible={setState}/>
            <SideBar state={state} setState={setState}/>
            <div className="flex flex-col  flex-grow">
                <div className="flex-shrink-0 h-[100px] flex-col ">
                    <Header/>


                </div>

               <Modal/>

            </div>
        </div>
    );
}