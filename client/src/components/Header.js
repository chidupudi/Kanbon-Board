import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link } from 'react-router-dom';  // Import Link for routing

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {/* Link component wraps the Kanban title to make it clickable */}
        <Link to="/home" style={styles.link}>
          <h1>Kanban Board</h1>
        </Link>
      </div>
      <div style={styles.right}>
        <IconButton style={styles.iconButton} title="Feedback">
          <FeedbackIcon style={styles.icon} />
        </IconButton>
        <IconButton style={styles.iconButton} title="Profile">
          <PersonIcon style={styles.icon} />
        </IconButton>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    height: '60px',
    background: '#3f51b5',
    color: '#fff',
    padding: '0 20px',
    zIndex: '1000',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  left: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '1.5rem',
  },
  avatar: {
    marginLeft: '10px',
  },
  // Added styling for the Link to remove default link styles
  link: {
    textDecoration: 'none',  // Removes underline from the link
    color: '#fff',  // Make the title white
    cursor: 'pointer',  // Change cursor to pointer on hover
  },
};

export default Header;
