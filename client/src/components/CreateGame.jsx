import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createVideogame, getGenres, getVideogames } from "../redux/actions";
import style from "../css/CreateGame.module.css";

function validate(videogameLocalState) {
    let errors = {};
    if (!videogameLocalState.name) {
        errors.name = "You must provide a name"
    } else if (videogameLocalState.name.length < 3) {
        errors.name = "Check the length of your name. It doesn't have at least 3 characters"
    } else if (!videogameLocalState.description) {
        errors.description = "You must provide a description"
    } else if (videogameLocalState.description.length < 20) {
        errors.description = "Come on... give us some more words about your videogame!"
    } else if (!videogameLocalState.released) {
        errors.released = "You must provide a release date"
    } else if (!videogameLocalState.rating) {
        errors.rating = "You must provide a rate"
    } else if (videogameLocalState.rating > 5 || videogameLocalState.rating < 0) {
        errors.rating = "Rate must be a number between 1-5"
    }
    return errors;
}

export default function CreateGame() {
    const dispatch = useDispatch();
    let history = useHistory();

    const [videogameLocalState, setVideogameLocalState] = useState({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    })

    const [formErrors, setFormErrors] = useState({});
    const genres = useSelector(state => state.genres);
    // console.log(genres)

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getVideogames())
    }, [dispatch]);
    
    function handleChange(ev) {
        setVideogameLocalState({
            ...videogameLocalState,
            [ev.target.name]: ev.target.value
        })
        setFormErrors(validate({
            ...videogameLocalState,
            [ev.target.name]: ev.target.value
        }));
    }
    function handleChangePlatforms(ev) {
        if (!videogameLocalState.platforms.includes(ev.target.value)) {
            setVideogameLocalState({
                ...videogameLocalState,
                platforms: [...videogameLocalState.platforms, ev.target.value]
            })
        }
    }

    function handleChangeGenres(ev) {
        if (!videogameLocalState.genres.includes(ev.target.value)) {
            setVideogameLocalState({
                ...videogameLocalState,
                genres: [...videogameLocalState.genres, ev.target.value]
            })
        }
    }
    function handleSubmit(ev) {
        if (!videogameLocalState.name || !videogameLocalState.description
            || !videogameLocalState.image
            || !videogameLocalState.released
            || !videogameLocalState.rating
            || videogameLocalState.platforms.length < 1
            || videogameLocalState.genres.length < 1) {
            ev.preventDefault();
            alert('Algunas de las entradas estan incompletas')
        } else {
            ev.preventDefault();
            dispatch(createVideogame(videogameLocalState));
            alert('Videojuego creado satisfactoriamente!');
            setVideogameLocalState({
                name: '',
                description: '',
                image: '',
                released: '',
                rating: '',
                platforms: [],
                genres: []
            })
            history.push('/home');
        }
        
    }

    function handledeletePlatforms(ev) {
        setVideogameLocalState({
            ...videogameLocalState,
            platforms: videogameLocalState.platforms.filter(plat => plat !== ev)
        })
    }

    function handleDeleteGenres(ev) {
        setVideogameLocalState({
            ...videogameLocalState,
            genres: videogameLocalState.genres.filter(gen => gen !== ev)
        })
    }

    return (
        <div className={style.formContainer}>
            <br />
            <h1 className={style.title}>Post your game</h1>
            <form className={style.formContainer} onSubmit={(ev) => handleSubmit(ev)}>
                <div className={style.formInput}>
                    <label htmlFor="name">Name:</label>
                    <input name="name"
                        type="text"
                        className={style.select}
                        placeholder="Name your game"
                        value={videogameLocalState.name}
                        onChange={(ev) => handleChange(ev)}></input>
                    <br />
                    <div>{formErrors.name && (<p>{formErrors.name}</p>)}</div>
                </div>
                <div className={style.formInput}>
                    <label htmlFor="description">Description:</label>
                    <input name="description"
                        type="text"
                        className={style.select}
                        value={videogameLocalState.description}
                        onChange={(ev) => handleChange(ev)}></input>
                    {formErrors.description && (<p>{formErrors.description}</p>)}
                </div>
                <div className={style.formInput}>
                    <label htmlFor="released">Date of releases:</label>
                    <input name="released"
                        type="date"
                        className={style.select}
                        value={videogameLocalState.released}
                        onChange={(ev) => handleChange(ev)}></input>
                    {formErrors.released && (<p>{formErrors.released}</p>)}
                </div>
                <div className={style.formInput}>
                    <label htmlFor="rating">Rating:</label>
                    <input name="rating"
                        type="number"
                        className={style.select}
                        placeholder="Rate between 1-5"
                        value={videogameLocalState.rating}
                        onChange={(ev) => handleChange(ev)}></input>
                    {formErrors.rating && (<p>{formErrors.rating}</p>)}
                </div>
                <div className={style.formInput}>
                    <label htmlFor="image">Image:</label>
                    <input name="image"
                        type="url"
                        className={style.select}
                        placeholder="Paste your image url here"
                        value={videogameLocalState.image}
                        onChange={(ev) => handleChange(ev)}></input>
                </div>
                <div className={style.formInput}>
                    <label htmlFor="platforms">Platforms:</label>
                    <select name="platforms" className={style.select} onChange={(ev) => handleChangePlatforms(ev)}>
                        <option hidden={true}>Select some platforms</option>
                        {platforms.map(plt => <option value={plt} className={style.select}>{plt}</option>)}
                    </select>
                    <div>
                        {formErrors.platforms && (<p>{formErrors.platforms}</p>)}
                    </div>
                    <div>
                        {videogameLocalState.platforms.map(pl => 
                        <div>
                            <button type="button" className={style.chip} onClick={() => handledeletePlatforms(pl)}>{pl}</button>
                        </div>
                        )}
                    </div>
                </div>
                <div className={style.formInput}>
                <label htmlFor="genres">Genres:</label>
                <select name="genres" className={style.select} onChange={(ev) => handleChangeGenres(ev)}>
                <option hidden={true}>Select some genres</option>
                {genres.map(gen => <option  value={gen} className={style.select}>{gen}</option>)}
                </select>
                {videogameLocalState.genres.map(gen =>
                <div>
                    <button  type="button" className={style.chip} onClick={() => handleDeleteGenres(gen)}>{gen}</button>
                </div>
                )}
                </div>
                <br />
                <div className={style.formButtons}>
                <button type="submit" className={style.button}>Create</button>
                <div>
                <Link to="/home"><button className={style.buttonSecondary}>Cancel</button></Link>
                </div>
                </div>   
            </form>
        </div>
    )
};




