// server/controllers/videoController.js
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

// AWS S3 konfiguráció beállítása
// Ezeket a környezeti változókat az AWS IAM felhasználójától kapja meg.
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION // Pl. 'eu-central-1'
});

// Ideiglenes videó modell (ideális esetben MongoDB Schema-t használ)
let videos = []; 

/**
 * Kezeli a videó feltöltését az S3-ba és a metaadatok mentését.
 */
exports.uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nincs feltöltendő fájl.');
        }

        const file = req.file;
        const bucketName = process.env.AWS_BUCKET_NAME;
        const fileKey = `${Date.now()}_${file.originalname}`;

        const params = {
            Bucket: bucketName,
            Key: fileKey, // A fájl neve az S3-ban
            Body: file.buffer, // A buffer a memória tárolóból (memoryStorage)
            ContentType: file.mimetype,
            ACL: 'public-read' // A videó nyilvánosan olvasható lesz
        };

        // Feltöltés az S3-ra
        const s3UploadResult = await s3.upload(params).promise();

        // Adatbázis mentése (Most csak egy egyszerű tömbbe)
        const newVideo = {
            _id: videos.length + 1,
            title: req.body.title || file.originalname,
            s3Key: fileKey,
            s3Url: s3UploadResult.Location, // A publikus S3 URL
            uploadDate: new Date()
        };
        videos.push(newVideo);

        console.log('✅ Sikeres S3 feltöltés:', s3UploadResult.Location);

        res.status(201).json({
            message: 'Videó sikeresen feltöltve',
            video: newVideo
        });

    } catch (error) {
        console.error('❌ Hiba a videó feltöltése közben:', error);
        res.status(500).json({ error: 'Szerver hiba a feltöltés során.' });
    }
};

/**
 * Listázza a feltöltött videó metaadatait
 */
exports.getVideos = (req, res) => {
    res.status(200).json(videos);
};