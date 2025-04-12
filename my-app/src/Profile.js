import React from 'react';
import './App.css'; // Make sure you’re importing App.css
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <h2>Cookie Muncher</h2>
            <p><strong>About me</strong></p>
            <p>My name is Cookie Muncher. The way to my heart is food. I love to bake. Cookies. Yum.</p>
          </div>
          <img src="/cookie-monster.jpg" alt="Cookie Muncher" className="profile-img" />
        </div>
      </div>

      {/* Recipes Created */}
      <div className="section">
        <h3>Recipes created</h3>
        <div className="recipe-card">
          <img src="/choc-chip.jpg" alt="Chocolate chip cookies" />
          <div className="overlay">
            <h4>Chocolate chip cookies</h4>
            <p>100 Foodies Made it!</p>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>

      {/* Recipes Made Favorites */}
      <div className="section">
        <h3>Recipes Made Favorites</h3>
        <div className="recipe-card">
          <img src="/blueberry-cake.jpg" alt="Blueberry Cake" />
          <div className="overlay">
            <h4>Blueberry Cake</h4>
            <p>By Cake Lady</p>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
