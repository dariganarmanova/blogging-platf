const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtAuth')
//201 -> created
//200 -> OK

//docs: middleware verifyToken for jwt 
//using bcrypt to hash the password plus decrypt and compare the password 
//i am sending the userId in the res.json for the frontend to store in the local session and do other operations such as verifying the user and stuff like that i am doing that with JWT? 

app.use(express.json())
app.use(cors())

const JWT_SECRET = 'nvdsvnjekna'

app.post('/sign', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const password_hash = await bcrypt.hash(password, 10)
        const result = await pool.query("INSERT INTO users (username,email, password_hash) VALUES ($1, $2, $3) RETURNING *", [username, email, password_hash])
        const userId = result.rows[0].id
        const token = jwt.sign({ id: userId, username: result.rows[0].username, email: result.rows[0].email }, JWT_SECRET)
        if (result) {
            return res.status(201).json({ message: "Successfully logged in", id: userId, token: token })
        }
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: "Email already in use" })
        } else {
            return res.status(500).json({ message: "Trouble in the server? Pls try again" })
        }
    }
})

app.post('/log', async (req, res) => {
    const { email, password } = req.body
    try {
        const res = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (!res) {
            return res.status(404).json({ message: "Sorry, user was not found" })
        }
        const user = res.rows[0]
        const passwordDecr = await bcrypt.compare(password, user.password_hash)
        if (!passwordDecr) {
            return res.status(409).json({ message: "Passwords do not match" })
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET)
        if (result) {
            return res.status(200).json({ message: "LogIn was successful", id: user.id, token: token })
        }
    } catch (error) {
        return res.status(500).json({ message: "" })
    }
})

module.exports = app