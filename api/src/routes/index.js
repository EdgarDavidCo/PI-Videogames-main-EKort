const { Router } = require('express');
const router = Router();
const { getGameByQuery, getGameById, postGame } = require("../controllers/videogameControllers");
const { getGenres } = require ("../controllers/genresControllers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/videogames", getGameByQuery)
router.get("/genres", getGenres)
router.get("/videogame/:id",getGameById)
router.post("/videogames", postGame)



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
