// Import necessary libraries
import express from 'express';
import multer from 'multer';
import { createHelia } from 'helia';
// Hypothetical import, replace with actual import for file handling
import { unixfs } from '@helia/unixfs';

// Initialize Express and Multer
const app = express();
const upload = multer();

// Create Helia instance
const helia = await createHelia();
// Hypothetical usage, replace with actual usage for file handling
const u = unixfs(helia);

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        // Hypothetical method to add files, replace with actual method
        const myImmutableAddress = await u.add(file.buffer);

        res.json({ link: `https://ipfs.io/ipfs/${myImmutableAddress}` });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file to IPFS.");
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
