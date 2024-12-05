import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const BlogCreate = () => {
    const [blogText, setBlogText] = useState("");
    const [display, setDisplay] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/blog')
                setDisplay(response.data)
            } catch (error) {
                console.error("Error fetching the data", error)
            }
        }
        fetchBlogs()
    }, [])

    const addBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/blog', { blogText })
            if (response.data) {
                setDisplay(response.data)
                setBlogText('')
            }
        } catch (error) {
            throw new Error("Failed to add the resource", error.message)
        }
    }
    return (
        <div>
            <h1>Create a Blog here</h1>
            <form onSubmit={addBlog}>
                <input
                    type='text'
                    required
                    value={blogText}
                    onChange={(e) => setBlogText(e.target.value)}
                    placeholder='Add new Blog'
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default BlogCreate
