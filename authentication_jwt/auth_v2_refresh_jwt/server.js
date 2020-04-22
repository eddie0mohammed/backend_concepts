
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');



const app = express();



//BD
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to DB'))
.catch((err) => console.log(err))



//MIDDLEWARES
app.use(cors());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//ROUTES

app.use('/auth', authRouter);
app.use('/posts', postRouter);






const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
})