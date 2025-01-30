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
apiRoutes.get('/users/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: new RegExp(req.params.name, 'i') });
        
        if (!user || user.name.toLowerCase() !== req.params.name.toLowerCase()) {
            return res.status(404).json({ message: 'User not found!' });
        }
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
