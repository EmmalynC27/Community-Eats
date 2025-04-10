import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import './index.css';
import FilterMenu from './FilterMenu';
import LoginPage from './LoginPage';
import { useAuth } from './AuthContext'; // Make sure you have this context

const CommunityEats = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="community-eats">
        <Routes>
          {/* Login route - always accessible */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes - only accessible after login */}
          <Route path="/home" element={
            currentUser ? (
              <>
                <header className="header">
                  <h1>COMMUNITY EATS</h1>
                  <nav className="navigation">
                    <ul>
                      <li><Link to="/home">Home</Link></li>
                      <li><Link to="/about-us">About Us</Link></li>
                      <li><Link to="/recipe-library">Recipe Library</Link></li>
                    </ul>
                  </nav>
                  <hr className="divider" />
                </header>

                <main className="main-content">
                  <section className="welcome-section">
                    <p>Welcome to Community Eats...</p>
                  </section>
                  <hr className="divider" />
                  <section className="subscribe-section">
                    <h2>KEEP EATING!</h2>
                    <table className="subscribe-table">
                      <tbody>
                        <tr>
                          <td>SUBSCRIBE</td>
                          <td>
                            <input type="email" placeholder="Email address" className="email-input" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </main>

                <footer className="footer">
                  <p>© 2025, Community Eats</p>
                  <p>(810) 246 - 8357</p>
                  <p>1234 Michigan Avenue, Dearborn, MI 48124</p>
                </footer>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          <Route path="/about-us" element={currentUser ? <AboutUs /> : <Navigate to="/login" replace />} />
          <Route path="/recipe-library" element={currentUser ? <FilterMenu /> : <Navigate to="/login" replace />} />
          
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Redirect any other path to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CommunityEats;