import React from "react";
import style from "../css/Card.module.css";


export default function Card({ released, image, name, genres, rating}) {
    return (
        <div className={style.card}>
            <h2 className={style.cardSecondaryText}>{rating}</h2>
            <img src={image} alt='Videogame cover' />
            <div className={style.cardContent}>
                <h1 className={style.cardHeader}>{name}</h1>
                <h3 className={style.cardSecondaryText}>{genres.join(' - ')}</h3>
                <h3 className={style.cardSecondaryText}>Released: {released}</h3>
                
            </div>
        </div>

    )
}