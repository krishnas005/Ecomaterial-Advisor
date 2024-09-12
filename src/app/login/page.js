"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from '../../components/Header';

const LoginPage = () => {
  const loginRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.fromTo(
      loginRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const res = await axios.post('/api/login', { email, password });
 
      localStorage.setItem('token', res.data.token);

      alert('Login successful'); 
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen"> 
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-green-400 to-blue-500 items-center justify-center">
          <img
            src="https://source.unsplash.com/featured/?nature,sustainability"
            alt="Login Page Image"
            className="w-full h-full object-cover"
          />
        </div>
 
        <div
          ref={loginRef}
          className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white"
        >
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Login to Your Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <TextField
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 2 }}
                className="transition-transform duration-300 hover:scale-105"
              >
                Login
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
