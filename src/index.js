import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import ListAd from "./components/ad/ListAd";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/js/all.min.js'

import PostAd from "./components/ad/PostAd";
import EditAd from "./components/ad/EditAd";
import Signin from "./components/auth/Signin";
import Footer from "./components/Footer";
import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="ads/active" element={<ListAd />} />
          <Route path="ads/new" element={
            <PrivateRoute>
              <PostAd />
            </PrivateRoute>} />
          <Route path="ads/edit/:id" element={
            <PrivateRoute>
              <EditAd />
            </PrivateRoute>} />
          <Route path="auth/signin" element={<Signin />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
