import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { adminRecipes } from './AdminRecipes'; // Your hard-coded "team original" recipes
import './recipelibrarymenu.css';
import { Link } from 'react-router-dom'; // For linking to /recipe/:id

const FilterMenu = () => {
  // Recipes from Firestore
  const [recipes, setRecipes] = useState([]);
  // Filtered Firestore recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // NEW: Filtered admin recipes
  const [filteredAdminRecipes, setFilteredAdminRecipes] = useState([]);

  // Cuisine filter checkboxes state
  const [cuisineFilter, setCuisineFilter] = useState({
    American: false,
    Asian: false,
    Italian: false,
    Mediterranean: false,
    Mexican: false
  });

  // Food type filter checkboxes state
  const [foodTypeFilter, setFoodTypeFilter] = useState({
    Burgers: false,
    Pastas: false,
    Salads: false,
    Steaks: false,
    Tacos: false
  });

  // Diet filter radio: "all", "omnivore", or "herbivore"
  const [diet, setDiet] = useState('all');

  // 1) On mount, fetch only the Firestore recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'recipes'));
        const dbRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(dbRecipes);
        setFilteredRecipes(dbRecipes);
        console.log('Fetched Firestore recipes:', dbRecipes);
      } catch (error) {
        console.error('Error fetching recipes from Firestore:', error);
      }
    };
    fetchRecipes();
  }, []);

  // Helper to check if a given recipe matches the current filters
  const passesFilters = (recipe) => {
    // Diet filter
    if (diet !== 'all' && recipe.diet !== diet) return false;

    // Cuisine filter
    const activeCuisines = Object.keys(cuisineFilter).filter(key => cuisineFilter[key]);
    if (activeCuisines.length > 0) {
      if (!recipe.cuisineType || !activeCuisines.includes(recipe.cuisineType)) {
        return false;
      }
    }

    // Food type filter
    const activeFoodTypes = Object.keys(foodTypeFilter).filter(key => foodTypeFilter[key]);
    if (activeFoodTypes.length > 0) {
      if (!recipe.foodType || !activeFoodTypes.includes(recipe.foodType)) {
        return false;
      }
    }

    return true;
  };

  // 2) Update filtered Firestore recipes AND admin recipes when filters change
  useEffect(() => {
    // Filter Firestore recipes
    const newFiltered = recipes.filter((r) => passesFilters(r));
    setFilteredRecipes(newFiltered);

    // Filter the admin/hard-coded recipes as well
    const newAdminFiltered = adminRecipes.filter((r) => passesFilters(r));
    setFilteredAdminRecipes(newAdminFiltered);

  }, [diet, cuisineFilter, foodTypeFilter, recipes]);

  // Handlers for filter changes
  const handleCuisineChange = (e) => {
    const { name, checked } = e.target;
    setCuisineFilter(prev => ({ ...prev, [name]: checked }));
  };

  const handleFoodTypeChange = (e) => {
    const { name, checked } = e.target;
    setFoodTypeFilter(prev => ({ ...prev, [name]: checked }));
  };

  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  return (
    <div className="page-container">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="veg-option-btn">VEGETARIAN LIBRARY OPTION</button>
      </div>

      {/* Header */}
      <header className="header">
        <h1>COMMUNITY EATS</h1>
        <nav className="navigation">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><a href="/recipes">Recipe Library</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </nav>
      </header>

      <hr className="divider" />

      <div className="main-content">
        {/* Sidebar with Filters */}
        <aside className="filter-sidebar">
          <h2>Filter</h2>
          {/* Diet Filter */}
          <div className="diet-filter">
            <p><strong>Diet:</strong></p>
            <label className="diet-radio-option">
              <input
                type="radio"
                name="diet"
                value="all"
                checked={diet === 'all'}
                onChange={handleDietChange}
              />
              All
            </label>
            <label className="diet-radio-option">
              <input
                type="radio"
                name="diet"
                value="omnivore"
                checked={diet === 'omnivore'}
                onChange={handleDietChange}
              />
              Omnivore
            </label>
            <label className="diet-radio-option">
              <input
                type="radio"
                name="diet"
                value="herbivore"
                checked={diet === 'herbivore'}
                onChange={handleDietChange}
              />
              Herbivore
            </label>
          </div>

          {/* Cuisine Checkboxes */}
          <h3>Cuisine</h3>
          <ul className="filter-list">
            {Object.keys(cuisineFilter).map(key => (
              <li key={key}>
                <label>
                  <input
                    type="checkbox"
                    name={key}
                    checked={cuisineFilter[key]}
                    onChange={handleCuisineChange}
                  />
                  {key}
                </label>
              </li>
            ))}
          </ul>

          {/* Food Type Checkboxes */}
          <h3>Food Type</h3>
          <ul className="filter-list">
            {Object.keys(foodTypeFilter).map(key => (
              <li key={key}>
                <label>
                  <input
                    type="checkbox"
                    name={key}
                    checked={foodTypeFilter[key]}
                    onChange={handleFoodTypeChange}
                  />
                  {key}
                </label>
              </li>
            ))}
          </ul>
        </aside>

        {/* Recipe Section */}
        <section className="recipe-section">
          <h2 className="section-title">Recipes</h2>

          {/* Filtered admin recipes */}
          <h3>Community Eats Team Original</h3>
          <div className="recipe-grid">
            {filteredAdminRecipes.length > 0 ? (
              filteredAdminRecipes.map(admin => (
                <Link
                  key={admin.id}
                  to={`/recipe/${admin.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="recipe-card">
                    {admin.imageUrl && (
                      <img
                        src={admin.imageUrl}
                        alt={admin.name}
                        className="recipe-image"
                      />
                    )}
                    <h3 className="recipe-name">{admin.name}</h3>
                    <p className="recipe-category">
                      {admin.cuisineType} | {admin.foodType} | {admin.diet}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No recipes found</p>
            )}
          </div>

          {/* Filtered community recipes from Firestore */}
          <h3>Community Recipes</h3>
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <Link
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="recipe-card">
                    {recipe.imageUrl && (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="recipe-image"
                      />
                    )}
                    <h3 className="recipe-name">{recipe.name}</h3>
                    <p className="recipe-category">
                      {recipe.cuisineType} | {recipe.foodType} | {recipe.diet}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No recipes found</p>
            )}
          </div>
        </section>
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

export default FilterMenu;
