import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './AboutUs'; // Ensure the correct import
import './index.css'; // Assuming you'll create a corresponding CSS file
import FilterMenu from './FilterMenu'; // Import the full FilterMenu component

const CommunityEats = () => {
  return (
    <Router>
      <div className="community-eats">
        <header className="header">
          <h1>COMMUNITY EATS</h1>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link> {/* Link to Home page */}
              </li>
              <li>
                <Link to="/about-us">About Us</Link> {/* Link to AboutUs page */}
              </li>
              <li>
                <Link to="/recipe-library">Recipe Library</Link> {/* Placeholder Link */}
              </li>
            </ul>
          </nav>
          <hr className="divider" />
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <section className="welcome-section">
                  <p>
                    Welcome to Community Eats - a space where food lovers come together to share, recreate, 
                    and reinvent their favorite recipes! As a member, you can upload your own culinary creations, 
                    discover new dishes, and get inspired by others in our vibrant food community. Whether you're 
                    an experienced cook or a beginner, everyone's welcome to join in the fun and explore a world 
                    of flavors. Let's cook, share, and eat!
                  </p>
                </section>

                <hr className="divider" />

                {/* Email Subscribe Section */}
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
              </>
            } />

            <Route path="/about-us" element={<AboutUs />} />
            {/* Placeholder route for Recipe Library / This is the filtermenu */}
            <Route path="/recipe-library" element={<FilterMenu />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025, Community Eats</p>
          <p>(810) 246 - 8357</p>
          <p>1234 Michigan Avenue, Dearborn, MI 48124</p>
        </footer>
      </div>
    </Router>
  );
};

export default CommunityEats;
