const express = require('express')
const app = express()
const cors = require('cors')
const blog = require('./routes/blog')
const log = require('./routes/auth')
const sign = require('./routes/auth')

app.use(cors())
app.use(express.json())

app.use('/', blog)
app.use('/', log)
app.use('/', sign)

app.listen(8000, () => {
    console.log("Server is listening to port 8000")
})
