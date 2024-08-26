const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

require('dotenv').config();

// connect to the MongoDB database
const connect = require('./database/MongoDB/connection');
connect()
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });


// MARK: routers
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');
const likesRouter = require('./routes/likes');
const adminRouter = require('./routes/admin');

const app = express();
// Enable All CORS Requests
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiRouter = express.Router();

// MARK: middleware
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/likes", likesRouter);
apiRouter.use("/admin", adminRouter);


app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
