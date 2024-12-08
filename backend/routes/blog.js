const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtAuth')

app.use(cors())
app.use(express.json())

app.post('/blog', verifyToken, async (req, res, next) => {
    const { blogText } = req.body
    const userId = req.user.id
    try {
        const userFind = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
        if (!userFind.rows.length) {
            return res.status(404).json({ message: "User not found" })
        }
        const response = await pool.query("INSERT INTO blogs (blogText, userId) VALUES ($1,$2) RETURNING *", [blogText, userId])
        console.log(response.rows[0])
        return res.status(201).json({ message: "Successfully created your blog", data: response.rows[0] })
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