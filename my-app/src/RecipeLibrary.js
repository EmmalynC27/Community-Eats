import React from 'react';
import { Link } from 'react-router-dom';

const RecipeLibrary = () => {
  return (
    <div className="recipe-library">
      <header className="header">
        <h1>COMMUNITY EATS</h1>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
        </nav>
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
