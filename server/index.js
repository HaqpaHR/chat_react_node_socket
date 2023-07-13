const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_DB;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router)


app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT: ${PORT}`)
})

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB is connected')).catch((error) => console.log('Mongo error is:', error.message))
