import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";  // Import Link for navigation
import Header from "../components/Header";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = /$^|.+@.+..+/.test(formData.email) ? "" : "Email is not valid";
    tempErrors.password =
      formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
    <Header/>
    <Container
      style={{
        marginTop: "8rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                style={{ marginBottom: "1rem" }}
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
                style={{ marginBottom: "1rem" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                style={{
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  padding: "1rem",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Redirect to Signup Page */}
        <Typography
          variant="body2"
          style={{
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          New user?{" "}
          <Link
            to="/signup"
            style={{
              color: "#3f51b5",
              textDecoration: "none",
            }}
          >
            Click here to sign up
          </Link>
        </Typography>
      </Box>
    </Container>
    </>
  );
};

export default LoginPage;
