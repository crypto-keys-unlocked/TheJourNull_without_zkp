import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const JWT = process.env.PINATA_JWT;
    const filePath = `${req.file.path}`;

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Authorization': `Bearer ${JWT}`,
                ...formData.getHeaders(),
            },
        });

        fs.unlinkSync(filePath);

        res.json({ cid: response.data.IpfsHash });
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        res.status(500).send('Error uploading to IPFS');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
