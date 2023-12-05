import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width="500"
          height="400"
        ></img>
        <h1 className="display-5 fw-bold text-body-emphasis">
          Welcome to Hocus Focus
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            At Hocus Focus, we believe in the magic of giving new life to the things we no longer need. Our mission is to create a community where users can effortlessly discover, buy, and sell quality items.
          </p>
          <p className="lead mb-4">
            Whether you're on the lookout for a hidden gem or looking to part with treasures of your own, Hocus Focus is the place for you. We are passionate about sustainability, reusability, and the stories behind every item.
          </p>
          <p className="lead mb-4">
            Join us in reducing waste and making the world a little more magical by giving your possessions a second chance to shine. Thank you for being part of the Hocus Focus community. Let's create a world where every item finds its perfect match!
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
