import React, { useState } from "react";
import { ButtonPagination } from "../Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Table = ({ pastaRefId, data, search }) => {
    const [page, setPage] = useState(1);
    const limitItems = 4;
    const navigate = useNavigate();

    const listItems = (items, pageActual) => {
        const filteredItems = items.filter(
            (item) =>
                item.autor === localStorage.nome &&
                item.pastaRefId === pastaRefId &&
                Object.values(item.descricao.text).some((texto) =>
                    removeAccents(texto.trim().toLowerCase()).includes(removeAccents(search.trim().toLowerCase()))
                )
        );
        const totalPage = Math.ceil(filteredItems.length / limitItems);
        if (pageActual > totalPage) return [];

        return filteredItems.slice((pageActual - 1) * limitItems, pageActual * limitItems);
    };

    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredItems = listItems(data, page);

    return (
        <div className="flex flex-col w-full items-center">
            <table className="w-full ml-4 text-center">
                <thead className="h-[57px]">
                    <tr className="w-full text-[14px]">
                        <th className="w-1/2 text-start pl-5 rounded-tl-lg bg-[#F3F5FF] border-l-2 border-y-2 border-[#509CDB]">
                            Nome do arquivo
                        </th>
                        <th className="bg-[#F3F5FF] border-x-0 border-y-2 border-[#509CDB]">Autor</th>
                        <th className="bg-[#F3F5FF] border-x-0 border-y-2 border-[#509CDB]">Data de criação</th>
                        <th className="rounded-tr-lg border-r-2 border-y-2 bg-[#F3F5FF] border-[#509CDB]">
                            Tamanho do arquivo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, i) => (
                        <tr
                            key={i}
                            className="border border-[#EAECF0] h-[80px] cursor-pointer text-[14px]"
                            onClick={() => {
                                localStorage.setItem(`search`, search);
                                navigate(`/visualizar-audio/${item.id}`)
                            }}
                        >
                            <td className="px-5 font-medium text-start">{item.nome}</td>
                            <td align="center">
                                <img className="rounded-[100px] w-10" src={localStorage.getItem("foto")} alt="" />
                            </td>
                            <td>{moment(item.dataCriacao).parseZone().format("DD/MM/YYYY")}</td>
                            <td>{item.tamanho}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination page={page} setPage={setPage} totalItems={filteredItems.length} limitItems={limitItems} />
        </div>
    );
};

export const Pagination = ({ page, setPage, totalItems, limitItems }) => {
    const totalPage = Math.ceil(totalItems / limitItems);

    return (
        <div className="flex items-center gap-7 mt-10">
            <ButtonPagination
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className={page === 1 ? "cursor-not-allowed" : ""}
            >
                Anterior
            </ButtonPagination>
            {totalItems === 0 ? (
                <p>Nenhum arquivo cadastrado</p>
            ) : (
                <p>Página {page} de {totalPage}</p>
            )}
            <ButtonPagination
                onClick={() => page < totalPage && setPage(page + 1)}
                disabled={page >= totalPage}
                className={page >= totalPage ? "cursor-not-allowed" : ""}
            >
                Próximo
            </ButtonPagination>
        </div>
    );
};
