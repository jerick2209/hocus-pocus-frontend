import React, { useState } from "react";
import axios from "axios";
import { getUserId } from "../util/getUserId";
const API_ENDPOINT = "https://hocus-pocus-backend.onrender.com/auth/signin";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend API for user authentication
      const response = await axios.post(API_ENDPOINT, {
        email,
        password,
      });

      // Assuming your backend returns a token upon successful authentication
      const token = response.data.token;

      if (token) {
        const userId = getUserId(token);
        localStorage.setItem("userId", userId);
      }
      // Save the token to local storage
      if (response.data.success) {
        localStorage.setItem("token", token);
        window.location = "/";
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
