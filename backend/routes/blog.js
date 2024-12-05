const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const verifyToken = require('../middleware/jwtAuth')

app.use(cors())
app.use(express.json())

app.post('/blog', async (req, res) => {
    const { blog } = req.body
    try {
        const response = await pool.query("INSERT INTO blogs (blogText) VALUES ($1) RETURNING *", [blog])
        return res.status(201).json({ message: "Successfully created your blog", data: response.data })
    } catch (error) {
        return res.status(500).json({ message: "Error creating this data" })
    }
})

app.get('/blog', async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM blogs")
        res.json(response)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching this data" })

    }
})

module.exports = app