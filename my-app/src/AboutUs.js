import React from 'react';
import './StyleAboutUs.css'; // Assuming you'll create a corresponding CSS file
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './index.css';
import FilterMenu from './FilterMenu';
import LoginPage from './LoginPage';
import { useAuth } from './AuthContext'; // Make sure you have this context
import './fonts.css';

const AboutUs = () => {
  return (
    <div className="about-us">
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
      

      <main className="about-us-section">
        <div className="about-us-image">
          <img src="/images/about-us-image.png" alt="Tacos on a plate." className="about-us-image"/>
        </div>
          <div className="about-us-text">
            <h1 className="title">About Us</h1>     
            <p>
              At Community Eats, we're passionate about bringing people together through the love of food. Our platform is designed to connect home cooks,
               food enthusiasts, and chefs of all skill levels to share recipes and experiment with new ideas.
            </p>
            <p>
              We believe that food is more
              than just sustenance—it’s a way to build community, celebrate cultures, and create lasting memories.
              Community Eats is here to make cooking and connecting easier and more enjoyable for everyone.
            </p>
            <p>
              Our headquarters is located at 1234 Michigan Avenue, Dearborn, MI 48124, but our community exists worldwide - accessible to anyone who loves food!
            </p>
          </div>
        </main>

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
   

      <footer className="footer">
        
      </footer>
    </div>
  );
};

export default AboutUs;

