// Profile.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './recipelibrarymenu.css'; 
import './App.css';

const Profile = () => {
  const [displayName] = useState('Cookie Muncher');
  const [aboutMe] = useState('My name is Cookie Muncher. I love to bake cookies!');
  const [profilePic] = useState('https://i.scdn.co/image/ab6761610000e5eba3a7cba23d68a4e73c3b8155');

  const [recipes] = useState([
    {
      id: '1',
      name: 'Chocolate Chip Cookies',
      imageUrl: 'https://images.unsplash.com/photo-1625876981820-be17a6807189?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3',
      stats: '100 Foodies Made it!'
    },
    {
      id: '2',
      name: 'Sugar Cookies',
      imageUrl: 'https://images.unsplash.com/photo-1643769781849-904ce171fe76?q=80&w=1306&auto=format&fit=crop&ixlib=rb-4.0.3',
      stats: '50 Foodies Made it!'
    },
  ]);

  // Enable arrows in the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true, // ensure arrows are displayed
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <h1>COMMUNITY EATS</h1>
        <nav className="navigation">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/recipe-library">Recipe Library</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <hr className="divider" />

      {/* Main Profile Content */}
      <div className="profile-container" style={{ padding: '20px 40px' }}>
        <div className="profile-card" style={{ marginBottom: '40px' }}>
          <div className="profile-content">
            <div className="profile-info">
              <h2 className="profile-heading">{displayName}</h2>
              <p><strong>About me</strong></p>
              <p>{aboutMe}</p>
            </div>
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic"
            />
          </div>
        </div>

        {/* Recipes Carousel */}
        <h3 className="section-title">Recipes Created</h3>
        <Slider {...settings}>
          {recipes.map(recipe => (
            <div key={recipe.id} style={{ padding: '0 10px' }}>
              <div className="recipe-slide-container">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="recipe-slide-image"
                />
                <div className="recipe-slide-overlay">
                  <div className="recipe-overlay-left">
                    <span className="recipe-overlay-arrow">←</span>
                    <span className="recipe-overlay-text">{recipe.name}</span>
                  </div>
                  <div className="recipe-overlay-right">
                    <span className="recipe-overlay-text">{recipe.stats}</span>
                    <span className="recipe-overlay-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="subscribe-section">
          <h3>KEEP EATING!</h3>
          <input
            type="email"
            placeholder="Email address"
            className="subscribe-input"
          />
        </div>
        <div className="footer-details">
          <p>© 2025, Community Eats</p>
          <p>(810) 246 - 8357</p>
          <p>1234 Michigan Avenue, Dearborn, MI 48124</p>
        </div>
        <div className="social-media">
          <a href="/">Facebook</a> | <a href="/">Pinterest</a> | <a href="/">YouTube</a> | <a href="/">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
