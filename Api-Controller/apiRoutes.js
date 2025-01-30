import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const apiRoutes = express.Router();
// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_URI);
        const db = mongoose.connection;
        console.log(`MongoDB Connected: ${db.host}`.cyan.underline);
} catch (error) {
    console.log(`MongoDB connection Error:`, error);
    setTimeout(connectDB, 5000); // try to connect after 5 seconds
    }
}
connectDB();

// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
})
const formMessage = mongoose.model('formMessage', userSchema);

// Save Form Data 
apiRoutes.post('/about', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const formData = new formMessage({ name, email, subject, message });
        await formData.save();
        res.status(201).json({ message: 'Form submitted successfully!', formData: formData });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Get All Form Data
apiRoutes.get('/messages', async (req, res) => {
        try {
            const formMessages = await formMessage.find();
            res.json(formMessages);
        } catch (error) {
            res.status(400).json({ error: error });
        }
});


export default apiRoutes;
