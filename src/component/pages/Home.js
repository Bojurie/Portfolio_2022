import React from 'react'
import Hero from '../Hero';
import About from './About';
import Contact from './Contact';
import './Home.css';
import Project from './Project';

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <About />
        <Project />
        <Contact />


      </div>
    </>
  )
}

export default Home;
