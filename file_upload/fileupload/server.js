
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const userRouter = require('./routes/user');


const app = express();




// DB
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('successfully connected to DB');
})


//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//routes
app.use('/user', userRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});