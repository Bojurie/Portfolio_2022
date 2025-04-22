import React from 'react'
import './About.css'

import image from '../images/IMG_0699-2.jpg';

const About = () => {

  // const [paragraph, setParagraph ] = useState('')
  return (
    <div className='about'>
      <div className='container'>
        <div className='about-wrapper'>
          <div className='about-header'>
              <h1><span className='span'>2.</span> About Me</h1>
          </div>

          <div className='about-content'>
              <div className='about-img' >
                  <img src={image}  alt='profile-img'/>
              </div>
               
              <p>
                Hi, My name is Bojurie Rogers-Wright and I love bringing my clients ideas to life. My love for creating beautiful responsive website applications started back in 2019 but my love for technology started way back in 2004 when i first arrived in the state. But back then i was more into dismantling my old pc, installing rams and window XP operating systems to seeing how everything work. As time past i divert from that and went into studying international Business. All an all I would say my love for tech has alway been there.
                
                My and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.
                <br/>
                Here are a few technologies I’ve been working with recently: <br/>
              
              </p>

              <div className='technologies'>
                <ul className='technologies-list'>
                  <li>JavaScript</li>
                  <li>ReactJs</li>
                  <li>NodeJs</li>
                </ul> <br/>
                <ul className='technologies-list_right'>
                  <li>ExpressJs </li>
                  <li>MySql</li>
                  <li>MongoDB</li>
                </ul>
              </div>
           
          </div>
          
        </div>
        
      </div>
      
    </div>
  )
}

export default About
