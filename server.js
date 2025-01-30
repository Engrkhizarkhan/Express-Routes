import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './Routes/Router.js';
import requestEndpoints from './Middleware/requestMethodsAndUrls.js';
import notFound from './Middleware/errHandling.js';


dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Create Socket.io server
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:8000',
        methods: ['GET', 'POST']
    }
});

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Make io accessible to the router
app.set('io', io);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(requestEndpoints);

// Routes 
app.use('/', router)


// Error Handling
app.use(notFound);

// Server
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port.yellow.bold}`.cyan.underline);
})