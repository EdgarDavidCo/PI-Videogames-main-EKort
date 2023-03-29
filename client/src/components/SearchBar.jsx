import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../redux/actions";
import style from "../css/SearchBar.module.css";


export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("");
    function handleInputChange(ev) {
        ev.preventDefault();
        setSearchName(ev.target.value);
    }
    function handleSearchSubmit(ev) {
        ev.preventDefault();
        dispatch(getNameVideogame(searchName));
        setSearchName("");
    }
    return (
        <div className={style.searchbar}>
            <input className={style.searchInput} onChange={(ev) => handleInputChange(ev)} type='text' placeholder='Find your videogame...'></input>
            <button className={style.searchButton} onClick={(ev) => handleSearchSubmit(ev)} type='submit'>Search</button>

        </div>
    )
};
