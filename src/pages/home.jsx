import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdsList from "../components/home/AdsList";
import HeroSection from "../components/home/HeroSection";
const Home = () => {
  return (
    <div className="container mt-5">
      <HeroSection />
      <AdsList />
    </div>
  );
};

export default Home;
