const express = require('express')
const app = express()
const cors = require('cors')
const blog = require('./routes/blog')

app.use(cors())
app.use(express.json())

app.use('/', blog)

app.listen(8000, () => {
    console.log("Server is listening to port 8000")
})
