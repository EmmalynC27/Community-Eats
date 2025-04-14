import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebaseConfig';
import './StyleRecipeLibrary.css'; // Make sure this filename matches exactly

const RecipeLibrary = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = getDatabase(app);
    const recipesRef = ref(database, 'recipes');

    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const array = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRecipes(array);
      } else {
        setRecipes([]);
      }
      setLoading(false);
    });

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
      </header>

      <main className="main-content">
        <h2 className="community-recipes-title">Recipe Library</h2>

        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <section className="recipe-categories">
            {recipes.map((recipe) => (
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
                <Link to={`/recipe/${recipe.id}`} className="view-category-btn">
                  View Recipe
                </Link>
              </div>
            ))}
          </section>
        )}

        <section className="subscribe-section">
          <h2 className="subscribe-heading">KEEP EATING!</h2>
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