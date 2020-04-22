
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const postRouter = require('./routes/posts');
const authRouter = require('./routes/auth');



const app = express();


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// ROUTES
app.use('/posts', postRouter);
app.use('/auth', authRouter);


const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
})