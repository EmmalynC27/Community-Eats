import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database'; // Realtime Database imports
import { app } from './firebaseConfig'; // Import app from your config
import './index.css';
import { useAuth } from './AuthContext';
import './fonts.css';
import styles from './StyleRecipeLibrary.css';

const RecipeLibrary = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Realtime Database
    const database = getDatabase(app);
    const recipesRef = ref(database, 'recipes');
    
    // Listen for value changes
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const recipesData = snapshot.val();
      if (recipesData) {
        // Convert object to array
        const recipesArray = Object.keys(recipesData).map(key => ({
          id: key,
          ...recipesData[key]
        }));
        setRecipes(recipesArray);
      } else {
        setRecipes([]);
      }
      setLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

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

        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <>
            <section className="recipe-categories">
              {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <h3>{recipe.name || recipe.title}</h3>
                  <p>{recipe.category || recipe.cuisineType}</p>
                  {recipe.imageUrl && (
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.name || recipe.title} 
                      className="recipe-image" 
                    />
                  )}
                  <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">
                    View Recipe
                  </Link>
                </div>
              ))}
            </section>

            <hr className="divider" />
          </>
        )}

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