import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//rest api
app.get('/', (req, res) => {
    res.send({
        message : 'Welcome to digital canvas !'
    });
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
