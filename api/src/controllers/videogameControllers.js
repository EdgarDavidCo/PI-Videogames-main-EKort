const axios = require("axios");
const { Videogame, Genre } = require("../db");
require('dotenv').config();
const API_KEY = process.env.API_KEY

const getApiInfoGame = async () => {
    let games = [];
    try {
        for (let index = 1; index < 6; index++) {
            await (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`)).data.results.map((element) => {
                games.push({
                    id: element.id,
                    name: element.name,
                    image: element.background_image,
                    released: element.released,
                    rating: element.rating,
                    platforms: element.platforms.map((el) => el.platform.name),
                    genres: element.genres.map((el) => el.name),
                })
            })
        }
        return games;
    } catch (error) {
        console.log(error);
    }
}

const getInfoDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] }
        }
    })
}

const getInfoTotal = async () => {
    const infoApi = await getApiInfoGame();
    const infoDb = await getInfoDb();
    const infoTotal = infoApi.concat(infoDb);
    return infoTotal;
}

const getGameByQuery = async (req, res) => {
    const { name } = req.query;
    const getGames = await getInfoTotal();
    if (name) {
        let gamesFiltered = [];
        getGames.map(element => {
            let boll = element.name.toLowerCase().startsWith(name.toLowerCase())
            if (boll) {
                gamesFiltered.push(element)
            }
        })
        gamesFiltered.length > 0 ? res.status(200).send(gamesFiltered) :
            res.status(404).send("No se encontro el videojuego😭")
    } else {
        res.status(200).send(getGames)
    }
}

const getGameById = async (req, res) => {
    const { id } = req.params;
    if (id.length > 9) {
        const game = await Videogame.findOne({
            where: { id: id },
            include: [{ model: Genre }],
        })
        const infoApiDescription = {
            id: game.id,
            name: game.name,
            description: game.description.replace(/<[^>]*>?/g, ''),
            released: game.released,
            image: game.background_image ? game.background_image : game.image,
            platforms: game.platforms,
            rating: game.rating,
            genres: game.genres.map(el => el.name)
        }
        res.send(infoApiDescription)
    } else {
        const apiData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const descriptionApi = {
            id: apiData.data.id,
            name: apiData.data.name,
            description: apiData.data.description.replace(/<[^>]*>?/g, ''),
            released: apiData.data.released,
            image: apiData.data.background_image,
            rating: apiData.data.rating,
            platforms: apiData.data.platforms.map(el => el.platform.name),
            genres: apiData.data.genres.map(el => el.name)
        }
        res.status(200).send(descriptionApi)
    }
}
const postGame = async ( req, res, next ) => {
    let { name, image, description, released, rating, platforms, genres } = req.body
    try {
        if(rating === "") rating = null;
        if(released === "") released = null;
        const newReview = await Videogame.create({
            name,
            image,
            description,
            released,
            rating,
            platforms,
        })
        const allGenres =  await Genre.findAll({ where:{ name:genres } })
        newReview.addGenre(allGenres)
        res.status(200).json(`Juego ${newReview.dataValues.name} creado`)
    } catch (error) {
        next(error)
    }
}

// const postGame = async (req, res) => {
//     const { name, image, description, released, rating, platforms, genres } = req.body;
//     let gameObjet = {
//         name, image: image ? image : "https://p4.wallpaperbetter.com/wallpaper/985/799/687/dauntless-videogame-video-games-wallpaper-preview.jpg",
//         description, released, rating, platforms
//     }
//     try {
//         const gameCreated = await Videogame.create(gameObjet)
//         let genreDb = await Genre.findAll({
//             where: {name:genres}
//         })
//         gameCreated.addGenre(genreDb)
//         res.status(200).send("Juego creado con exito 😎");
//     } catch (error) {
//         console.log(error)
//         res.status(404).send(error)
//     }
// }

module.exports = {
    getGameByQuery,
    getGameById,
    postGame
}