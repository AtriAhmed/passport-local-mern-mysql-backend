'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

const passport = require('passport')
require('./config/passportConfig')(passport) // pass passport for configuration

const session = require('express-session')
const sessionStore = require('./config/promiseConnection')

const PORT = process.env.PORT
const cors = require("cors")
var corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5173']
}


const sequelize = require('./config/database');

sequelize.sync().then((res) => {
  console.log(res);
}).catch((error) => {
  console.error('Error syncing models with the database:', error);
});



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(
  session({
    secret: process.env.MY_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 3600000 1 hour in milliseconds. The expiration time of the cookie to set it as a persistent cookie.
      sameSite: true
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.listen(PORT, () =>
  console.log(`React API server listening on http://localhost:${PORT}`)
)
