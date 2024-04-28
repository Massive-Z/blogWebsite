import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url); // get the name of the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/IST256Solo2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true
    }).then (() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error("Error connecting to MongoDB",err);
    });

app.use('/users', userRouter);
app.use('/blogs', blogRouter);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend'), {
    // Set content type explicetly for .js files
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Define the route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running`);
})