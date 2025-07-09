const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./utils/connectDB');
const PORT = process.env.PORT || 5500;  

// Importing routes
const authRouter = require('./routes/auth');
const projectsRouter = require("./routes/projects")
const issuesRouter = require("./routes/issues")
const invitesRouter = require("./routes/invites")

// Middleware for authentication
const protect = require("./middleware/authMiddleware")

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, }));

// db connection
connectDB()

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/projects',protect, projectsRouter);
app.use('/api/v1/issues',protect, issuesRouter);
app.use('/api/v1/invites',protect, invitesRouter);

//test route
app.get('/', (req, res) => {
    res.send('Welcome to TrackFlow API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
