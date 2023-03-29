import React from "react";
import style from "../css/InvalidSearch.module.css"

export default function InvalidSearch(){
    return(
        <div className={style.invalid}>
        <h1>Your search has no results yet</h1>
        <p>Please correct and try again</p>

        </div>
    )
}