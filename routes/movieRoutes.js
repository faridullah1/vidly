const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(movieController.getAllMovies)
	.post(auth, movieController.createMovie);

router.route('/:id')
	.get(movieController.getMovieById)
	.put(movieController.updateMovie)
	.delete(movieController.deleteMovie)

module.exports = router;