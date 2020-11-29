const express = require('express')
const morgan = require('morgan')

const userRouter = require('./userRoute')
const postRouter = require('./postRoute')

const app = express()

app.use(morgan('dev'))

app.use('/user', userRouter)
app.use('/posts', postRouter)

app.get('/', (req, res) => {
    res.send('<h1>I am listening</h1>')
})

app.get('*', (req, res) => {
    res.send('<h1>404 Not found</h1>')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
