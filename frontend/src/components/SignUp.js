import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/sign', { username, email, password })
            const token = response.data.token
            localStorage.setItem("token", token)
            if (response.data) {
                alert("User successfully logged in")
                navigate('/blogs')
            }
        } catch (error) {
            throw new Error("Sorry unable to register", error.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                />
                <input
                    type='text'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username'
                />
                <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignUp
