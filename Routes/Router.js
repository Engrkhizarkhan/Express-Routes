import express from 'express';
import webRoutes from '../Webpages-Controller/webRoutes.js';
import apiRoutes from '../Api-Controller/apiRoutes.js';
const router = express.Router();

// Web Pages
router.use('/', webRoutes);

// API Routes
router.use('/api', apiRoutes);


export default router;