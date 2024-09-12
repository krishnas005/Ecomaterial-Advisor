"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from '../../components/Header';

const SignupPage = () => {
  const signupRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.fromTo(
      signupRef.current,
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
      const res = await axios.post('/api/signup', { name, email, password, employeeId });
 
      // localStorage.setItem('token', res.data.token);

      alert('Signup successful'); 
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen"> 
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-purple-400 to-pink-500 items-center justify-center">
          <img
            src="https://source.unsplash.com/featured/?teamwork,innovation"
            alt="Signup Page Image"
            className="w-full h-full object-cover"
          />
        </div>
 
        <div
          ref={signupRef}
          className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white"
        >
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
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
              <div className="mb-2">
                <TextField
                  label="Unique Employee ID"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 2 }}
                className="transition-transform duration-300 hover:scale-105"
              >
                Sign Up
              </Button>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
