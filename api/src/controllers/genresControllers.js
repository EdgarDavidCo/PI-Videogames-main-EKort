const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();
const API_KEY = process.env.API_KEY

const getGenres = async (req, res) => {
    try {
        let findGenreDb = Genre.findAll()
        if (findGenreDb.length > 0) {
            res.status(200).send(findGenreDb.map(element => element.name))
        } else {
            const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const infoApiUrl = apiUrl.data.results.map(element => element.name)
            infoApiUrl.forEach(el => {
                Genre.findOrCreate({
                    where: { name: el }
                })
            })
            // console.log(infoApiUrl)
            let otherInfo = await Genre.findAll()
            let utilInfo = otherInfo.map(element => element.name)
            console.log(utilInfo.length)
            res.status(200).send(utilInfo)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getGenres
}