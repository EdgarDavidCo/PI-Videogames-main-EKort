import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../redux/actions";
import { useEffect } from "react";
import style from "../css/VideogameDetail.module.css";

export default function VideogameDetail() {
    const videogameDetail = useSelector(state => state.videogameDetail)
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(videogameDetail)

    useEffect(() => {
        dispatch(getVideogameDetail(id))
    }, [dispatch, id])
    return (
        <div className={style.main}>
            <div className={style.nav}>
                <div className={style.navleft}>
                    <Link to='/home'><h1>{'<'} Back home</h1></Link>
                </div>
                <div className={style.navRight}>
                    <Link to='/create'><button className={style.button}>Create videogame</button></Link>
                </div>
                </div>
                <div className={style.gameDetail}>
                    <div className={style.gameInfo}>
                        <h1>{videogameDetail.name}</h1>
                        <h2>{videogameDetail.genres?.join(" - ")}</h2>
                        <h3>Platforms: {videogameDetail.platforms?.join(", ")} </h3>
                        <h4 className={style.letter}>Date of released: {videogameDetail.released}</h4>
                        </div>
                    <div className={style.gameCover}>
                        <h4>Rating: {videogameDetail.rating}</h4>
                        <img src={videogameDetail.image} alt="Videogame cover" />
                        <p dangerouslySetInnerHTML={{ __html: videogameDetail.description }}></p>
                    </div>
            </div>
        </div>
    )

}

//     return (
//         <div className={style.contPrimary}>
//             {
//                 videogames && videogames.name ?
//                     <div>
//                         <button className={style.buttonBack}><Link className={style.linkBack} to="/home">Back</Link></button>
//                         <div className={style.conteTotal}>
//                             <div className={style.imgDesc}>
//                                 <h1 className={style.tittle}>{videogames.name}</h1>
//                                 <p><h2>Descripcion:</h2> {videogames.description} </p>
//                             </div>
//                             <div className={style.infoGame}>
//                                 <img src={videogames.image} alt="logoImg" />
//                                 <div className={style.infoRest}>
//                                     <h3>Plataformas: {videogames.platforms ? videogames.platforms + " " : "No hay nada"}</h3>
//                                     <br />
//                                     <h3>Generos: {videogames.id.length !== 36
//                                         ? videogames.genres?.map(el => el + ' ')
//                                         : videogames.Genres?.map(el => el.name + ' ')} </h3>
//                                     <br />
//                                     <h4>Rating: {videogames.rating} ★</h4>
//                                     <br />
//                                     <h4>Fecha de lanzamiento: {videogames.released}</h4>
//                                 </div>

//                             </div>

//                         </div>
//                     </div> : (
//                         <div className={style.loadK}>
//                             {/* <img src="https://c.tenor.com/W0wAOVqYANYAAAAj/kratos.gif" alt="logoload" /> */}
//                             <img src="https://media.tenor.com/VJNNkbWE3H4AAAAj/yoshi-mario.gif" alt="logoload" />
//                         </div>
//                     )
//             }

//         </div>
//     )

// }