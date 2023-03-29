import React from 'react';
import style from '../css/NoGamescreated.module.css';

export default function NoGamesCreated(){
    return(
        <div className={style.invalid}>
        <h1>Still no games have been created.</h1>
        <p>Do you want to start creating one? Press the 'create videogame' button.</p>

        </div>
    )
}