import React, { useRef }from 'react';
import './Project.css'

import video from '../videos/Screen Recording 2022-04-01 at 8.22.57 PM.mov';
import video1 from '../videos/Screen Recording 2022-04-01 at 8.23.25 PM.mov';
import video2 from '../videos/Screen Recording 2022-04-01 at 8.25.20 PM.mov';
import video3 from '../videos/Screen Recording 2022-04-01 at 8.27.28 PM.mov';
import video4 from '../videos/Screen Recording 2022-04-01 at 8.28.35 PM.mov';
import video5 from '../videos/Screen Recording 2022-04-01 at 8.30.37 PM.mov';
import video6 from '../videos/Screen Recording 2022-04-01 at 8.34.30 PM.mov';
import video7 from '../videos/Screen Recording 2022-04-03 at 3.51.52 AM.mov';
import video8 from '../videos/Screen Recording 2022-04-03 at 3.48.52 AM.mov';


const Project = ()=> {

  const ref = useRef(null);
  const handlePlayVideo = () => {
    ref.current.play();
  }
  const handlePauseVideo = () => {
    ref.current.pause();
  }

  return (
    <div className='project'>
      <div className='container'>
        <div className='project-wrapper'>
          <div className='project-content'>
              <h1><span className='span'>3.</span> Past Projects</h1>
              <div className='project-content'>
             
                <div className='box'>
                   <video 
                      className='clip ' ref={ref}>
                      <source src={video2} type='video/mp4' play muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                   </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref}>
                    <source src={video8} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                 </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref} >
                    <source src={video6} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                 </video>
                </div>

                <div className='box' >
                  <video className='clip' ref={ref}>
                    <source src={video} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref}>
                    <source src={video4} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref}>
                    <source src={video5} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                  </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref}>
                  <source src={video3} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                 </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref}>
                    <source src={video7} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref}>
                    <source src={video1} type='video/mp4' muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                  </video>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
