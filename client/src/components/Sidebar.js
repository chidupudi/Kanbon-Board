import React from 'react';

const Sidebar = () => {
  const teamMembers = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David White",
    "Eva Green",
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Team</h3>
      <ul style={styles.memberList}>
        {teamMembers.map((member, index) => {
          const initials = member.split(' ').map(name => name[0]).join('');
          return (
            <li key={index} style={styles.member}>
              <div style={styles.initials}>{initials}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '100px',
    height: 'calc(100vh - 60px)', // Adjust height to consider header height
    backgroundColor: '#283593',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '60px', // Position below the fixed header
    left: '0',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  },
  memberList: {
    listStyleType: 'none',
    paddingLeft: '0',
    margin: '0',
    flexGrow: 1,
  },
  member: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  initials: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundColor: '#ffeb3b',
    color: '#283593',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
};

export default Sidebar;
