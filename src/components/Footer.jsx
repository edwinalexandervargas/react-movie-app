import React from 'react'
import { footerLinks } from '../constants'
import { Link } from 'react-router-dom'
import logo from '../assets/movie-watching.png'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-slate-200 to-slate-500 p-16 flex flex-col items-center'>
        <img className='h-[60px] mb-6' src={logo} alt="" />
        <ul className='flex justify-center items-center gap-6 mb-4 font-semibold '>
            {footerLinks.map((link) =>(
                <li key={link.label}>
                    <Link className={link.className} to={link.path}>{link.label}</Link>
                </li>
            ))}
        </ul>
        <p>Copyright &copy; 2026 Movies</p>
    </footer>
  )
}

export default Footer