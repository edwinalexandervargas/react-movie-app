import React from 'react'
import logo from '../assets/movie-watching.png'
import navLinks from '../constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='relative bg-[url(/movie-theater-signboard.png)] bg-cover bg-[position:50%_60%] bg-no-repeat w-full p-12 flex justify-between items-center overflow-hidden'>
    <div className='absolute inset-0 bg-black/50 z-0'></div>
    <img className='h-[70px] w-auto relative z-10' src={logo} alt="" />
    <ul className='flex gap-10 items-center relative z-10'>
        {navLinks.map((link) => (
            <li key={link.label} className={link.className}>
                <Link to={link.path}>{link.label}</Link>
            </li>
        ))}
    </ul>
</nav>
  )
}

export default Navbar;