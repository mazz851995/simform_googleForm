import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to="/" className="navbar-brand">Home</Link>
            <h2>Custom Form</h2>
        </header>
    )
}

export default Header
