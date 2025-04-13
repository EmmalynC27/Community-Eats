import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { adminRecipes } from './AdminRecipes';
import './recipelibrarymenu.css'; // Keep your main CSS import so classes match

const RecipeDetails = () => {
  const { id } = useParams(); // e.g. /recipe/admin-burger-1
  const [recipe, setRecipe] = useState(null);
  const [isAdminRecipe, setIsAdminRecipe] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if this ID is in the adminRecipes
    const foundAdmin = adminRecipes.find((item) => item.id === id);
    if (foundAdmin) {
      setRecipe(foundAdmin);
      setIsAdminRecipe(true);
      setLoading(false);
    } else {
      // Otherwise, fetch from Firestore by doc ID
      const fetchRecipe = async () => {
        try {
          const docRef = doc(db, 'recipes', id);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            setRecipe({ id: snapshot.id, ...snapshot.data() });
          } else {
            console.warn('No recipe found in Firestore with ID:', id);
          }
        } catch (error) {
          console.error('Error fetching recipe details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div>Loading recipe...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  // Decide how to label the "author"
  const authorName = isAdminRecipe ? 'Community Eats Team' : 'User Submitted';

  return (
    <div className="page-container">
      {/* Top Bar (same style as FilterMenu) */}
      <div className="top-bar">
        <button className="veg-option-btn">VEGETARIAN LIBRARY OPTION</button>
      </div>

      {/* Header (same structure/classes as your other pages) */}
      <header className="header">
        <h1>COMMUNITY EATS</h1>
        <nav className="navigation">
          <ul>
            <li><a href="/recipes">Recipe Library</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </nav>
      </header>

      <hr className="divider" />

      {/* Main content container */}
      <div className="main-content" style={{ display: 'block' }}>
        {/* A section for the recipe details */}
        <section 
          className="recipe-details-section" 
          style={{ maxWidth: '700px', margin: 'auto' }}
        >
          <h2 style={{ fontFamily: 'Italiana, serif', fontSize: '32px' }}>
            {recipe.name}
          </h2>
          <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            By: {authorName}
          </p>

          {/* Image if present */}
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '6px',
                marginBottom: '20px'
              }}
            />
          )}

          {/* Basic recipe info */}
          <p><strong>Cuisine:</strong> {recipe.cuisineType || 'N/A'}</p>
          <p><strong>Food Type:</strong> {recipe.foodType || 'N/A'}</p>
          <p><strong>Diet:</strong> {recipe.diet || 'N/A'}</p>

          {/* Ingredients */}
          <h3 style={{ marginTop: '30px' }}>Ingredients</h3>
          <ul>
            {recipe.ingredients?.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          {/* Steps */}
          <h3 style={{ marginTop: '30px' }}>Instructions</h3>
          <ol>
            {recipe.steps?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          {/* A short "About" note */}
          <h3 style={{ marginTop: '30px' }}>About This Recipe</h3>
          {isAdminRecipe ? (
            <p>This is an official Community Eats Team recipe — enjoy!</p>
          ) : (
            <p>Thanks to our community for sharing this delicious dish!</p>
          )}
        </section>
      </div>

      {/* Footer (same style as FilterMenu) */}
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

export default RecipeDetails;
