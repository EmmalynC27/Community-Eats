import React from 'react';
import './index.css'; // Assuming you'll create a corresponding CSS file

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="header">
        <h1>ABOUT COMMUNITY EATS</h1>
      </header>

      <main className="main-content">
        <section className="about-us-section">
          <p>
            Community Eats is a space where food lovers come together to share, recreate, and reinvent their favorite recipes. 
            As a member, you can upload your culinary creations, discover new dishes, and get inspired by others in our vibrant food community. 
            Whether you're an experienced cook or a beginner, everyone's welcome to join in the fun and explore a world of flavors.
          </p>
          <p>
            Our headquarters are located at 1234 Michigan Avenue, Dearborn, MI 48124, but our community exists worldwide, accessible to anyone who loves food!
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
      </main>

      <footer className="footer">
        
      </footer>
    </div>
  );
};

export default AboutUs;

