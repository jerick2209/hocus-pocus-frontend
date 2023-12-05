import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import Register from "./pages/register";
import Profile from "./pages/profile";
import About from "./pages/about";
import Ads from "./pages/products";
import ProductDetails from "./pages/productDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/ads" element={<Ads />} />
        </Routes>
        <Routes>
          <Route path="/ads/:adId" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
