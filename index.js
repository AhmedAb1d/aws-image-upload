const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const client = new S3Client({
    region: 'eu-west-3',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
});

const app = express();

app.use(express.static('view'));

app.get('/api/images', (req, res) => {
    fs.readFile('images', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading images!');
        } else {
            const images = data.split('\n');
            res.status(200).send({ images: images });
        }
    });
});

app.post('/api/upload', upload.array('files'), (req, res) => {
    const uploadPromises = req.files.map(file => {
        const fileName = Date.now().toString() + '.png'
        const params = {
            Bucket: 'converty-bucket',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        fs.appendFileSync('images', fileName + '\n');
        return client.send(new PutObjectCommand(params));
    });
    Promise.all(uploadPromises).then(() => {
        console.log('Uploaded to S3!');
        res.status(200).send('Uploaded to S3!');
    }).catch(err => {
        console.log(err);
        res.status(500).send('Error uploading to S3!');
    });

});

app.listen(3000, () => {
    console.log('Server is listening 3000!');
});
