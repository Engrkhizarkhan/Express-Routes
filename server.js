import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './Routes/Router.js';

dotenv.config();
const port = process.env.PORT;
const app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes 
app.use('/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})