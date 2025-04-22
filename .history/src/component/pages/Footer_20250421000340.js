import React from 'react'
// import Copyright from '../../Copyright';
import SocialFollow from '../../SocialFollow';

import './Footer.css'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='container'>
          <div className='footer-wrapper'>
              <div>
                <SocialFollow />
              </div>
              {/* <Copyright /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
