// server/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/aws'); // Ezt hozza létre a következő lépésben
const { uploadVideo, getVideos } = require('../controllers/videocontroller.js');

// POST /api/videos/upload - A videó feltöltés útvonala
// A "video" a front-end form-data kulcsa lesz
router.post('/upload', upload.single('video'), uploadVideo);

// GET /api/videos - A feltöltött videók listázása (metadata)
router.get('/', getVideos);

module.exports = router;