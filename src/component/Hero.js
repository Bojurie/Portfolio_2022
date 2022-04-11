import React from 'react';
import './Hero.css'
import backgroundVideo from './images/video.mp4';
import Button from './Button';

const Hero = () => {
  return (
    <>
      <div className='hero-container'>
        <div className='hero-wrapper'>
            <div className='hero' >
                <video autoPlay loop muted id='video'>
                  <source src={backgroundVideo}/>
                </video>
                <div className='hero-content'>
                  <h3>Welcome to</h3>
                  <h2>Bojurie's Code</h2>
                  <p>Creating beautiful Web and Mobile applications with different functionalities while keeping the code clean.
                  </p>
                  <Button>
                    View Code Work
                  </Button>
                    
                </div>    
            </div>
        </div>
      </div>
    </>
  )
}

export default Hero
