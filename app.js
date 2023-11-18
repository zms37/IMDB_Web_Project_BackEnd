const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Added to use the path module

// Import routes
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const featuredTodayRouter = require('./routes/featuredToday');
// ... import other routes as needed

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/featuredToday', featuredTodayRouter);

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

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/featuredToday', featuredTodayRouter);
// ... use other routes

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../IMDB_Clone_FrontEnd/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../IMDB_Clone_FrontEnd/build', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
