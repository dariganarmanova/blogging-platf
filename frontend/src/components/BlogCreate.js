import React from 'react'
import { useState } from 'react';

const BlogCreate = () => {
    const [blogText, setBlogText] = useState("");
    return (
        <div>
            <h1>Create a Blog here</h1>
            <form>
                <input
                    type='text'
                    required
                    value={blogText}
                    onChange={(e) => setBlogText(e.target.value)}
                    placeholder='Add new Blog'
                />
            </form>
        </div>
    )
}

export default BlogCreate
