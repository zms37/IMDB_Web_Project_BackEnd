const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import your Movie model

const movies = [
    {
      title: 'Movie 1',
      genres: ['Action', 'Adventure'],
      director: '60d5ec9af682fbd39cc1abcd', // Mock ObjectId
      writer: '60d5ec9af682fbd39cc1abce', // Mock ObjectId
      releaseYear: 2022,
      posterImage: 'https://example.com/poster1.jpg',
      trailerUrl: 'https://example.com/trailer1.mp4'
    },
    {
      title: 'Movie 2',
      genres: ['Drama', 'Thriller'],
      director: '60d5ec9af682fbd39cc1abcf', // Mock ObjectId
      writer: '60d5ec9af682fbd39cc1abd0', // Mock ObjectId
      releaseYear: 2023,
      posterImage: 'https://example.com/poster2.jpg',
      trailerUrl: 'https://example.com/trailer2.mp4'
    },
    // ...more movies
  ];

  router.get('/featuredToday', async (req, res) => {
    try {
        // Code to filter the mock data based on some criteria, e.g., featuredDate
        // Since your mock data doesn't include a 'featuredDate' field, this part needs to be adapted
        const featuredMovies = movies;

        res.json(featuredMovies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;