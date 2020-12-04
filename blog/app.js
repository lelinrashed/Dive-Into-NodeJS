const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoute')

const app = express()

// Setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware)

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})

const PORT = process.env.PORT || 8080

mongoose.
    connect(`mongodb://localhost/blog`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        })
    }).catch((e) => {
        return console.log(e);
    })