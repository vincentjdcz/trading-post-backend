require('dotenv').config();

const routes = require('./routes/routes');
const postRoutes = require('./routes/post/routes');
const authRoutes = require('./routes/auth/routes')
const userRoutes = require('./routes/user/routes')
const offerRoutes = require('./routes/offer/routes')
const tradeRoutes = require('./routes/trade/routes')
const s3Routes = require('./routes/s3/routes')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allow all origins
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));



app.use(express.json({ limit: '50mb' }));


//app.use('/api', routes);
app.use('/api/post', postRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/offer', offerRoutes)
app.use('/api/trade', tradeRoutes)
app.use('/api/s3url', s3Routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})