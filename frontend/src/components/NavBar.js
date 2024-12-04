import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/blogs'>Blogs</Link>
                </li>
                <li>
                    <Link to='/log'>Log In</Link>
                </li>
                <li>
                    <Link to='/sign'>Sign Up</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
