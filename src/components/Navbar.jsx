import React from 'react'
import logo from '../assets/movie-watching.png'
import navLinks from '../constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gradient-to-b from-blue-400 to-blue-300 w-full p-10 flex justify-between items-center'>
    <img className='h-[70px] w-auto' src={logo} alt="" />
    <ul className='flex gap-10 items-center'>
        {navLinks.map((link) => (
            <li key={link.label}>
                <Link to={link.path} className={link.className}>{link.label}</Link>
            </li>
        ))}
    </ul>
</nav>
  )
}

export default Navbar;