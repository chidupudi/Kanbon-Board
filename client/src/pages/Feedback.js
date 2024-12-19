import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Header from '../components/Header';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') {
      setError('Please provide your feedback');
    } else {
      setError('');
      alert('Thank you for your feedback!');
      setFeedback(''); // Clear the feedback input
    }
  };

  return (
    <>
    <Header/>
    <Container sx={{ marginTop: 8 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          margin: 'auto',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: '#333' }}>
          <FeedbackIcon sx={{ marginRight: 1 }} />
          We Value Your Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Your Feedback"
                variant="outlined"
                value={feedback}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  padding: 1.5,
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}
              >
                Submit Feedback
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
    </>
  );
};

export default FeedbackPage;
