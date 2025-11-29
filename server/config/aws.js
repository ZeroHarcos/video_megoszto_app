// server/config/aws.js
const multer = require('multer');

// Állítsuk be a Multert az ideiglenes tárolásra, mielőtt feltöltjük az S3-ba
const storage = multer.memoryStorage(); // Videó buffer tárolása a memóriában

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // Pl. 100MB limit
    // Fontos! A ténylegesen nagy videófájl feltöltéshez használjon stremelést,
    // de ez az alap megoldás a metaadatok és a feltöltési folyamat teszteléséhez jó.
});

module.exports = upload;