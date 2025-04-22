import React from "react";
import Hero from "../Hero";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
};

export default Home;
