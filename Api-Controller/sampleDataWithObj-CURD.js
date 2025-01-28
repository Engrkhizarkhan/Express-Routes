const Users = [
    {id: 1,  name: 'John Doe'},
    {id: 2,  name: 'Jane Doe'},
    {id: 3,  name: 'Jim Doe'},
    {id: 4,  name: 'Jill Doe'},
]
// Get All Users
apiRoutes.get('/users', (req, res) => {
    res.json(Users);
});

// Get User By Id
apiRoutes.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = Users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ name: 'User not found' });
    }
    res.json(user);
});

// Add New User
apiRoutes.post('/users', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    Users.push(name);
    res.status(201).json({ message: 'User added successfully!', user: name });
});



// Update User
apiRoutes.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = Users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ name: 'User not found' });
    }
    user.name = req.body.name;
    if (!user.name) {
        return res.status(400).json({ error: 'Name is required.' });
    }
    res.status(201).json({ message: 'User updated successfully!', user });
});

// Delete User
apiRoutes.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = Users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ name: 'User not found' });
    }
    Users.splice(Users.indexOf(user), 1);
    res.status(201).json({
         message: 'User deleted successfully!',
         name: user.name,
        });
});
