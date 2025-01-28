import express from 'express';
const apiRoutes = express.Router();
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Connect to the database
dotenv.config();
mongoose.connect(process.env.mongodb_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const User = mongoose.model('user', userSchema);

// Get All Users
apiRoutes.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Get User By Id
apiRoutes.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Add New User
apiRoutes.post('/users', async (req, res) => {
    try {
        const user = new User({ name: req.body.name });
        await user.save();
        res.status(201).json({ message: 'User added successfully!', user: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Update User
apiRoutes.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.status(201).json({ message: 'User updated successfully!', user: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Delete User
apiRoutes.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'User deleted successfully!', user: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

export default apiRoutes;
