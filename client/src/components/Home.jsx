import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterByGenre, orderByName, orderByRating, filterByCreation } from "../redux/actions";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginado from "./Paginado";
import style from "../css/Home.module.css";
import InvalidSearch from "./InvalidSearch";
import NoGamesCreated from "./NoGamescreated";
import Loader from "./Loader";

export default function Home() {
    const allVideogames = useSelector(state => state.videogames);
    const [order, setOrder] = useState("");


    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setvideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const dispatch = useDispatch()


    // ---------------------------------------------------------------------------

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);


    function handleReset(ev) {
        ev.preventDefault();
        dispatch(getVideogames())
    }

    function handleFilterByCreation(ev) {
        dispatch(filterByCreation(ev.target.value))
        setCurrentPage(1)
    }


    function handleFilterByGenre(ev) {
        ev.preventDefault();
        dispatch(filterByGenre(ev.target.value))
        setCurrentPage(1)
    }

    function handleOrderByName(ev) {
        ev.preventDefault();
        dispatch(orderByName(ev.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${ev.target.value}`)
    }

    function handleOrderByRating(ev) {
        ev.preventDefault();
        dispatch(orderByRating(ev.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${ev.target.value}`)
    }



    return (
        <main className={style.main}>
            {/* NavBar */}
            <div className={style.nav}>
                <div className={style.navleft}>
                    <Link to='/home'><h1>GameScape</h1></Link>
                </div>
                <div className={style.navRight}>
                    <Link to='/create'><button className={style.button}>Created videogame</button></Link>
                    <SearchBar />
                </div>


            </div>
            {/* Contenido */}
            <div>
                {/* Barra de filtros y ordenamiento */}
                <div className={style.filtersAndOrders}>
                    <button className={style.buttonSecondary} onClick={ev => handleReset(ev)}>Clear filters</button>
                    <div>
                        <h4>Filter by:</h4>
                        <select className={style.select} onChange={ev => handleFilterByCreation(ev)}>
                            <option className={style.select} value='all'>All videogames</option>
                            <option className={style.select} value='created'>Created by user</option>
                            <option className={style.select} value='original'>Videogames Api</option>
                        </select>
                        <select className={style.select} onChange={(ev) => handleFilterByGenre(ev)}>
                            <option className={style.select} value="All">Game x genres</option>
                            <option className={style.select} value="Action">Action</option>
                            <option className={style.select} value="Adventure">Adventure</option>
                            <option className={style.select} value="Arcade">Arcade</option>
                            <option className={style.select} value="Board Games">Board Games</option>
                            <option className={style.select} value="Card">Card</option>
                            <option className={style.select} value="Casual">Casual</option>
                            <option className={style.select} value="Educational">Educational</option>
                            <option className={style.select} value="Family">Family</option>
                            <option className={style.select} value="Fighting">Fighting</option>
                            <option className={style.select} value="Indie">Indie</option>
                            <option className={style.select} value="Massively Multiplayer">Massively Multiplayer</option>
                            <option className={style.select} value="Platformer">Platformer</option>
                            <option className={style.select} value="Puzzle">Puzzle</option>
                            <option className={style.select} value="Racing">Racing</option>
                            <option className={style.select} value="RPG">RPG</option>
                            <option className={style.select} value="Shooter">Shooter</option>
                            <option className={style.select} value="Simulation">Simulation</option>
                            <option className={style.select} value="Sports">Sports</option>
                            <option className={style.select} value="Strategy">Strategy</option>
                        </select>
                    </div>
                    <div>
                        <h4>Order by:</h4>
                        <select className={style.select} onChange={ev => handleOrderByName(ev)}>
                            <option className={style.select} value='AZ'>A - Z</option>
                            <option className={style.select} value='ZA'>Z - A</option>
                        </select>
                        <select className={style.select} onChange={ev => handleOrderByRating(ev)}>
                            <option className={style.select} value='LTH'>Lower ratings</option>
                            <option className={style.select} value='HTL'>Higher ratings</option>
                        </select>
                    </div>
                </div>
                {/* Cards */}
                <div className={style.cards}>
                    {
                        currentVideogames[0] === 'No games created' ? <NoGamesCreated/>
                            : currentVideogames[0] === 'No results' ? <InvalidSearch/>
                                : currentVideogames.length === 0 ? <Loader/>
                                    : currentVideogames.map(vidg =>
                                        <Link key={vidg.id} to={`/videogames/${vidg.id}`}>
                                            <Card name={vidg.name} image={vidg.image} genres={vidg.genres} released={vidg.released} rating={vidg.rating} />
                                        </Link>
                                    )
                    }
                </div>
                {/* Paginado */}
                <div className={style.paginatedbox}>
                    <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado} />
                </div>
            </div>

        </main>
    )
}; 