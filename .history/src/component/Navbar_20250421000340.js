import React, { useState } from 'react';
import {Link } from 'react-router-dom'
// import {FaBars} from 'react-icons/fa'
// import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks } from './NavbarElement'

import './Navbar.css'

// import Logo from '../Logo-2.png'

const Navbar = ()=> {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
  setNavbarOpen(prev => !prev)
}
    return (
        <>
        {/* <Nav>
            <NavbarContainer>
                <NavLogo><h2>B|R-W</h2></NavLogo>
                <MobileIcon>
                    <FaBars />
                </MobileIcon>
                    <NavMenu>
                        <NavItem>
                           <NavLinks to='about'>Home</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='about'>About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='about'>Projects</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='about'>Contact</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='about'>About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='about'>Resume</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>

                    </NavBtn>
            </NavbarContainer>
        </Nav> */}

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