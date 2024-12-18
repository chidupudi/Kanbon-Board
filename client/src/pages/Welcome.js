import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import Header from '../components/Header';

const WelcomePage = () => {
  return (
    <>
    <Header/>
   

    <Container
      sx={{
        marginTop: "30px",
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Background color
        padding: 0,
        width: '100%',
      }}
    >
      {/* Top Section: Content with Title and Description */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
          maxWidth: '1400px',
        }}
      >
        {/* Left side content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 3,
              fontSize: '2.5rem',
            }}
          >
            Welcome to Your Kanban Board
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#7f8c8d',
              marginBottom: 4,
              fontSize: '1.2rem',
              lineHeight: '1.8',
              maxWidth: '600px',
            }}
          >
            Organize, prioritize, and manage your tasks effortlessly with our intuitive Kanban board. Whether you're planning your personal projects or collaborating with a team, this platform helps you keep track of everything in one place.
          </Typography>
        </Box>

        {/* Right side Get Started Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}
        >
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2980b9',
                color: '#fff',
                fontSize: '1.1rem',
                padding: '15px 30px',
                '&:hover': {
                  backgroundColor: '#1c6fa3',
                },
              }}
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Cards Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          padding: 5,
          marginTop: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: 3,
                backgroundColor: '#ecf0f1',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2980b9' }}>
                Simplified Task Management
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, color: '#7f8c8d' }}>
                Easily manage and organize your tasks into boards, columns, and cards. Track your work from start to finish.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: 3,
                backgroundColor: '#ecf0f1',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2980b9' }}>
                Collaboration at its Best
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, color: '#7f8c8d' }}>
                Share your boards with others, assign tasks, and stay updated in real time. Enhance your team's productivity with seamless collaboration.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: 3,
                backgroundColor: '#ecf0f1',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2980b9' }}>
                Visualize Your Workflow
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, color: '#7f8c8d' }}>
                Easily drag and drop tasks between columns. Get a visual overview of your workflow, ensuring everything stays on track.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
};

export default WelcomePage;
