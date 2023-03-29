import React from "react";
import style from "../css/Loader.module.css";


export default function Loader(){
    return(
        <div className={style.invalid}>
        <div className={style.loader}></div>
        </div>
    )
}