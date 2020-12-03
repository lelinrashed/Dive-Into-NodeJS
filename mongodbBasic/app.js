const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/contacts', router)

app.get('/', (req, res) => {
    res.send('welcome')
})

const PORT = process.env.PORT || 8080

mongoose.
connect(`mongodb://localhost/basicmongodb`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    })
}).catch((e) => {
    console.log(e);
})