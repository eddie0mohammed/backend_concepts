

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})


const photoRouter = require('./routes/photo');

const app = express();



//DB
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('successfully connected to DB');
})
.catch((err) => {
    console.log(err);
});



//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//SERVING STATIC FILES
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


//ROUTES
app.use('/photo', photoRouter)






const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
})