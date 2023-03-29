import React from "react";
import style from "../css/Paginado.module.css"

export default function Paginado({ videogamesPerPage, allVideogames, paginado }) {
    const pageNumber = [];
    for (let index = 1; index <= Math.ceil(allVideogames / videogamesPerPage); index++) {
        pageNumber.push(index)
    }
    return (
        <nav className={style.paginado}>
            <ul className={style.ulPaginado}>
                {
                    pageNumber.length > 0 && pageNumber.map(number => (
                        <button className={style.numeroPaginado} key={number} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
            </ul>

        </nav>
    )
}