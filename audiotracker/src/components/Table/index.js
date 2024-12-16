import React, { useState } from "react";
import { ButtonPagination } from "../Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Table = ({ data, search }) => {
    const [page, setPage] = useState(1);
    const limitItems = 4;
    const navigate = useNavigate();

    const listItems = (items) => {
        return items.filter((item) => {
            if (item.text != null) {
                return Object.values(item.text.text).some((texto) => {
                    if (texto) {
                        return removeAccents(texto.trim().toLowerCase()).includes(removeAccents(search.trim().toLowerCase()));
                    }
                    return false;
                });
            }
            return false;
        });
    };

    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const filteredItems = listItems(data);
    const paginatedItems = data.slice((page - 1) * limitItems, page * limitItems);

    return (
        <div className="flex flex-col w-full items-center">
            <table className="w-full ml-4 text-center">
                <thead className="h-[57px]">
                    <tr className="w-full text-[14px]">
                        <th className="w-1/2 text-start pl-5 rounded-tl-lg bg-[#F3F5FF] border-l-2 border-y-2 border-[#509CDB]">
                            Nome do arquivo
                        </th>
                        <th className="bg-[#F3F5FF] border-x-0 border-y-2 border-[#509CDB]">Status</th>
                        <th className="bg-[#F3F5FF] border-x-0 border-y-2 border-[#509CDB]">Autor</th>
                        <th className="bg-[#F3F5FF] border-x-0 border-y-2 border-[#509CDB]">Data de criação</th>
                        <th className="rounded-tr-lg border-r-2 border-y-2 bg-[#F3F5FF] border-[#509CDB]">
                            Tamanho do arquivo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedItems.map((item, i) => {
                        const isFiltered = listItems([item]).length > 0;
                        return (
                            <tr
                                key={i}
                                className={`border border-[#EAECF0] h-[80px] text-[14px] ${item.text && item.text.text ? "cursor-pointer" : "cursor-not-allowed"
                                    } ${isFiltered ? "" : item.text == null ? (search == "" ? "" : "hidden") : "hidden"}`}
                                onClick={() => {
                                    item.text && item.text.text && navigate(`/visualizar-audio`, { state: { arquivo: item, searchTb: search } });
                                }}
                            >
                                <td className="px-5 font-medium text-start">{item.nome}</td>
                                <td className={`px-5 font-medium ${item.text && item.text.text ? "text-green-400" : "text-red-400"}`}>
                                    {item.text && item.text.text ? "Concluido" : "Processando"}
                                </td>
                                <td align="center">
                                    <img
                                        className="rounded-[100px] w-10"
                                        src={item.fotoAutorPasta || "https://via.placeholder.com/150"}
                                        alt={`Foto do autor ${item.autorPasta || "desconhecido"}`}
                                    />
                                </td>
                                <td>{moment(item.dataCriacao).parseZone().format("DD/MM/YYYY")}</td>
                                <td>{item.tamanho}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Pagination page={page} setPage={setPage} totalItems={data.length} limitItems={limitItems} />
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
                <p>
                    Página {page} de {totalPage}
                </p>
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
