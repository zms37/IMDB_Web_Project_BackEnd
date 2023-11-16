const express = require('express');
const router = express.Router();

// Mock movies data
let movies = [
    { id: 1, title: 'Movie 1', director: 'Director 1', year: 2000 },
    { id: 2, title: 'Movie 2', director: 'Director 2', year: 2001 },
    // ... add more movies as needed
];

// Get all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Get a movie by id
router.get('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.json(movie);
});

// Create a new movie
router.post('/', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Update a movie
router.put('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    res.json(movie);
});

// Delete a movie
router.delete('/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('The movie with the given ID was not found.');
    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

// Get a movie by Genre
router.get('/genre/:genre', (req, res) => {
    const movie = movies.find(m => m.genre === parseInt(req.params.genre));
    if (!movie) return res.status(404).send('The movie with the given Genre was not found.');
    res.json(movie);
});

module.exports = router;