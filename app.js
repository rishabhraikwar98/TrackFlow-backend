const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/connectDB');
const authRouter = require('./routes/auth');
const PORT = process.env.PORT || 5500;  

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// db connection
connectDB()

app.use('/api/v1/auth',authRouter);

//test route
app.get('/', (req, res) => {
    res.send('Welcome to TrackFlow API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
