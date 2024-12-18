import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1>Kanban Board</h1>
      </div>
      <div style={styles.right}>
        <IconButton style={styles.iconButton} title="Profile">
          <PersonIcon style={styles.icon} />
        </IconButton>
        <IconButton style={styles.iconButton} title="Feedback">
          <FeedbackIcon style={styles.icon} />
        </IconButton>
        <Avatar alt="User" src="/static/images/avatar/1.jpg" style={styles.avatar} />
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
};

export default Header;
