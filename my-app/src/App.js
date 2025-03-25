import React from 'react';
import './index.css'; // Assuming you'll create a corresponding CSS file

const CommunityEats = () => {
  return (
    <div className="community-eats">
      <header className="header">
        <h1>COMMUNITY EATS</h1>
        <nav className="navigation">
          <a href="#recipe-library">Recipe Library</a>
          <a href="#about-us">About Us</a>
        </nav>
      </header>
        <p> Test changes </p>
      <main className="main-content">
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
    </div>
  );
};

export default CommunityEats;