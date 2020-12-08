const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const flash = require('connect-flash')

// Import routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// Import session staff
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

// Import middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')


const app = express()

const MONGODBURI = 'mongodb://localhost/blog'

// Session store
const store = new MongoDBStore({
    uri: MONGODBURI,
    collection: 'sessions'
});

// Setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store,
        // cookie: {
        //     maxAge: 60 * 60 * 2 * 1000
        // }
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]

app.use(middleware)

// Playground routers
// const validatorRoutes = require('./playground/validator')
// app.use('/playground', validatorRoutes)


app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})

const PORT = process.env.PORT || 8080

mongoose.
    connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        })
    }).catch((e) => {
        return console.log(e);
    })
