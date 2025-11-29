const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware-ek
app.use(cors());
app.use(express.json());

// Adatbázis csatlakozás (MongoDB)
mongoose.connect('mongodb://localhost:27017/videodb')
    .then(() => console.log('MongoDB csatlakozva!'))
    .catch(err => console.error('Hiba a MongoDB csatlakozáskor:', err));

// API útvonalak (még létre kell hozni a routes mappában)
// const videoRoutes = require('./routes/videos');
// app.use('/api/videos', videoRoutes);

app.get('/', (req, res) => {
    res.send('A Video App API fut!');
});

app.listen(PORT, () => {
    console.log(`A szerver fut a http://localhost:${PORT} címen`);
});