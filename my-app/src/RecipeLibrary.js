import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './index.css';
import FilterMenu from './FilterMenu';
import LoginPage from './LoginPage';
import { useAuth } from './AuthContext'; // Make sure you have this context
import './fonts.css';
import styles from './StyleRecipeLibrary.css';

const RecipeLibrary = () => {
  return (
    <div className="recipe-library">
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
        <h2 className="section-title">Recipe Library</h2>

        <section className="recipe-categories">
          <div className="recipe-card"><p>Plant Based</p></div>
          <div className="recipe-card"><p>Omnivore</p></div>
          <div className="recipe-card"><p>Special Diets</p></div>
        </section>

        <hr className="divider" />

        <section className="subscribe-section">
          <h2>KEEP EATING!</h2>
          <div className="subscribe-box">
            <button className="subscribe-button">SUBSCRIBE</button>
            <input type="email" placeholder="Email address" className="email-input" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025, Community Eats</p>
        <p>(810) 246 - 8357</p>
        <p>1234 Michigan Avenue, Dearborn, MI 48124</p>
      </footer>
    </div>
  );
};

export default RecipeLibrary;
