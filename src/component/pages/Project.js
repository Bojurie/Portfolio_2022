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
        <section className='project-wrapper'>
          <div className='project-content-wrapper'>
              <h1><span className='span'>3.</span> Past Projects</h1>
              <div className='project-content'>
             
                <div className='box'>
                   <video 
                      className='clip ' ref={ref} autoplay loop muted playsinline type='video/mp4' onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                      <source src={video2}  />
                   </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref}>
                    <source src={video8} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}/>
                 </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video6} />
                 </video>
                </div>

                <div className='box' >
                  <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video} />
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video4} />
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video5} />
                  </video>
                </div>

                <div className='box'>
                 <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                  <source src={video3} />
                 </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video7} />
                  </video>
                </div>

                <div className='box'>
                  <video className='clip' ref={ref} type='video/mp4' playsinline muted loop onMouseEnter={handlePlayVideo} onMouseLeave={handlePauseVideo}>
                    <source src={video1} />
                  </video>
                </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Project
