import React, { useState } from 'react';
import {Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ()=> {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
  setNavbarOpen(prev => !prev)
}
    return (
        <>
          <nav className='nav'> 
            <div className='Navbar'>
              <div className='logo'>
               <Link className="anchor" to='/'><h2>B|R-W</h2></Link> 
             </div>
            <ul className={`menuNav Navbar-links ${navbarOpen ? " showMenu" : ""}`}>
                <li><Link to=''>1. Home</Link></li>  
                <li><Link to='/about'>2. About </Link></li> 
                <li><Link to='/project'>3. Projects</Link></li> 
                <li><Link to='/contact'>4. Contact</Link></li> 
                <li className='resume'><Link to='/resume'>Resume</Link></li> 
            </ul> 
            
            <button onClick={handleToggle} >{navbarOpen ? "Close" : "Open"}</button>
            </div>
          </nav>
    </>
   
    )
}


export default Navbar;