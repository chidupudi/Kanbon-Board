import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1>Kanban Board</h1>
      </div>
      <div style={styles.right}>
        <button style={styles.iconButton} title="Profile">
          👤
        </button>
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
    fontSize: '1.5rem',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default Header;
