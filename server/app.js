const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

const passport = require('passport');
const passportSetup = require('./passport/config');

require('dotenv').config();
const db = require('./db')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true
}));


const sessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: 'UserSessions',
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 *60 * 1000
});

app.use(expressSession({
  secret: process.env.SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: 'auto',
    sameSite: 'Strict',
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }
}));

app.use(passport.initialize());

sessionStore.sync();

const sessionRouter = require('./routes/Sessions');
const userRouter = require('./routes/User');
const requestsRouter = require('./routes/Requests');

(async()=>{
    await db.sequelize.sync();
})()


app.use('/Sessions', sessionRouter);
app.use('/User', userRouter);
app.use('/Requests', requestsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // Sequelize Error Handling
  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map( err => err.message);
    return res.status(400).send(errors);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500).send(err.message)
});

app.listen(process.env.PORT, ()=> {
  console.log(`Connection established on Port ${process.env.PORT}`)
})

module.exports = app;
