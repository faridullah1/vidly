const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(genreController.getAllGenres)
	.post(auth, genreController.createGenre);

router.route('/:id')
	.get(genreController.getGenreById)
	.put(genreController.updateGenre)
	.delete([auth, admin], genreController.deleteGenre)

module.exports = router;