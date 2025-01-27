import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// const __filename & __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This Directory Path
const directoryPath = path.dirname(__dirname);

const webRoutes = express.Router();

// Home Page
webRoutes.get('/',  (req, res) => {
    res.sendFile(path.join(directoryPath, 'frontend', 'index.html'))
}); 

// About Page
webRoutes.get('/about', (req, res) => {
    res.sendFile(path.join(directoryPath, 'frontend', 'about.html'))
});

export default webRoutes;