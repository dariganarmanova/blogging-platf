import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/log', { email, password })
            const token = response.data.token
            localStorage.setItem("token", token)
            if (response.data) {
                navigate('/blogs')
            }
        } catch (error) {
            throw new Error("Sorry unable to log you in", error.message)
        }
    }
    return (
        <div>
            <h1>Please Log in Here</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LogPage
