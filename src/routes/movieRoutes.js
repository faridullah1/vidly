const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(movieController.getAllMovies)
	.post(auth, movieController.createMovie);

router.route('/:id')
	.get(movieController.getMovieById)
	.put(auth, movieController.updateMovie)
	.delete(auth, admin, movieController.deleteMovie)

module.exports = router;