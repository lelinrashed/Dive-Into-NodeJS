const { urlencoded } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')
// app.set('views', 'template/')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    let post = {
        title: 'Test title',
        body: 'Test body',
        published: false
    }

    let posts = [
        {title: 'Title One', author: 'Rashed'},
        {title: 'Title Two', author: 'Sisir'},
        {title: 'Title Three', author: 'Aiub'},
    ]

    res.render('pages/index', {title: 'Home', post, posts})
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

app.get('/help', (req, res) => {
    res.render('pages/help')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
