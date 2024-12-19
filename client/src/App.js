import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home'; // Adjust the import based on your folder structure
import SignupForm from './pages/Signup';
import LoginPage from './pages/Login';
import WelcomePage from './pages/Welcome';
import FeedbackPage from './pages/Feedback';


function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}> 
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;
