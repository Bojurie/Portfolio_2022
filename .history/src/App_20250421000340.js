import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';


import Home from './component/pages/Home';
import './App.css'
// import ScrollToTop from './component/ScrollToTheTop';
import About from './component/pages/About';
import Project from './component/pages/Project';
import Contact from './component/pages/Contact';
import Resume from './component/pages/Resume';
import Header from './component/Header';
import Footer from './component/pages/Footer';


const App = () => {
  return(
    <Router>
    <div className='app'>
      
      <Header />
      {/* <ScrollToTop /> */}
      <Routes>
          <Route path='/' exact element={(<Home/>)}/>
          <Route path='/about' element={(<About/>)}/>
          <Route path='/project' element={(<Project/>)}/>
          <Route path='/contact' element={(<Contact/>)}/>
          <Route path='/resume' element={(<Resume />)} />
      </Routes>
      <Footer />
    </div>
    </Router>
  )
}
export default App;
