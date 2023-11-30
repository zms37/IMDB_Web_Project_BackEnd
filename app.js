const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Added to use the path module


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// MongoDB Connection
const uri = "mongodb+srv://ZakMo:ZakariaNajdi278@cluster0.bbbnekm.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error.message);
});

// Firebase Connection
var admin = require("firebase-admin");
var serviceAccount = require("./filmhub-53ea4-firebase-adminsdk-ck4qb-ff2675ab05.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Import routes
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const featuredTodayRouter = require('./routes/featuredToday');
const actorsRoutes = require('./routes/actor');
const directorsRoutes = require('./routes/actor');
const genresRoutes = require('./routes/genre');
const reviewsRoutes = require('./routes/review');
const userWatchlistRoutes = require('./routes/UserWatchlist');
const writersRoutes = require('./routes/writer');
const userTopPicksRoutes = require('./routes/userTopPicks');
const recentlyAddMoivesRoutes = require('./routes/recentlyAddMoives');
const comingSoonRoutes = require('./routes/comingSoon');
// ... import other routes as needed

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/featuredToday', featuredTodayRouter);
app.use('/api/actors', actorsRoutes);
app.use('/api/directors', directorsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/UserWatchlist', userWatchlistRoutes);
app.use('/api/userTopPicks', userTopPicksRoutes);
app.use('/api/writers', writersRoutes);
app.use('/api/recentlyAddMoives', recentlyAddMoivesRoutes);
app.use('/api/comingSoon', comingSoonRoutes);
// ... use other routes

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../imdbclone/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../imdbclone/build', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
