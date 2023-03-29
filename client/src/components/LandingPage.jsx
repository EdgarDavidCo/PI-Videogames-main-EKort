import React from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css";


export default function LandingPage() {
    return (
        <section className={style.containerLand}>
            <div className={style.segContainer}>
                <div className={style.tercContainer}>
                    <h1 className={style.tituloLanding}>GameScape</h1>
                    <Link to="/home" className={style.link}>Start</Link>

                </div>

            </div>

        </section>
    )
}