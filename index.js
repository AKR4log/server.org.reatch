require('dotenv').config()
const express = require('express')
// const sequelize = require('./db')
// const models = require('./models/models')
// const cors = require('cors')
// const router = require('./routes/index')
// const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 4000

const app = express()
// app.use(cors())
app.use(express.json())
// app.use('/api', router)

// app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'WORKasdsadasdd!!!' })
})

app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' })
})


const start = async () => {
    try {
//         await sequelize.authenticate()
//         await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on posrt ${PORT}`))
    } catch (e) { console.log(e) }
}

start()
