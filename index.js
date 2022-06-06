require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/app', router)

app.use(errorHandler)

app.get('/hello-world', (req, res) => {
    res.status(200).json({ message: 'Server is running', port: `Operates on the port: ${PORT}`, url: `API used: ${req.url}` })
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    } catch (e) { console.log(e) }
}

start()
