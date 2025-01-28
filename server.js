import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './Routes/Router.js';
import requestEndpoints from './Middleware/requestMethodsAndUrls.js';
import notFound from './Middleware/errHandling.js';


dotenv.config();
const port = process.env.PORT;
const app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(requestEndpoints);

// Routes 
app.use('/', router)


// Error Handling
app.use(notFound);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port.yellow.bold}`.cyan.underline);
})
