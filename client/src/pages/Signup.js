import React, { useState } from "react";
import Header from "../components/Header";
import { TextField, Button, Grid, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import axios from "axios"; // Import Axios for API requests

const SignupForm = () => {
  const navigate = useNavigate(); // To navigate after signup
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // For success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName ? "" : "First Name is required";
    tempErrors.lastName = formData.lastName ? "" : "Last Name is required";
    tempErrors.email = /$^|.+@.+..+/.test(formData.email) ? "" : "Email is not valid";
    tempErrors.password =
      formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    tempErrors.confirmPassword =
      formData.confirmPassword === formData.password ? "" : "Passwords do not match";
    tempErrors.phone =
      /^[0-9]{10}$/.test(formData.phone) ? "" : "Phone number must be 10 digits";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Sending the signup data to the backend
        const response = await axios.post("http://localhost:5000/signup", formData);
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        setMessage(errorMessage);
      }
    }
  };

  return (
    <>
      <Header />
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3, color: "#333" }}>
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    padding: 1.5,
                    "&:hover": {
                      backgroundColor: "#303f9f",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Message Section */}
          {message && (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: 2,
                color: message.includes("success") ? "green" : "red",
              }}
            >
              {message}
            </Typography>
          )}

          {/* Redirect to Login Page */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#3f51b5",
                textDecoration: "none",
              }}
            >
              Click here to login
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default SignupForm;
