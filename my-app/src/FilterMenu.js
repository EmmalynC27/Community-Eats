import React, { useState } from 'react';

// Hard-coded sample data (not database)
const allRecipes = [
  { 
    title: 'Classic American Burger', 
    cuisine: 'American', 
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    title: 'Chicken Teriyaki', 
    cuisine: 'Asian', 
    image: 'https://images.unsplash.com/photo-1609183480237-ccbb2d7c5772?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { title: 'Margherita Pizza', cuisine: 'Italian' },
  { title: 'Greek Salad', cuisine: 'Mediterranean' },
  { title: 'BBQ Ribs', cuisine: 'American' },
  { title: 'Sushi Platter', cuisine: 'Asian' },
  { title: 'Pasta Carbonara', cuisine: 'Italian' },
  { title: 'Falafel Wrap', cuisine: 'Mediterranean' }
];

function FilterMenu() {
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Filter the recipes based on the selected cuisine
  const filteredRecipes =
    selectedCuisine === 'All'
      ? allRecipes
      : allRecipes.filter(recipe => recipe.cuisine === selectedCuisine);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* Sidebar for filter options */}
      <div style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h3>Filter</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {/* Option "All" */}
          <li onClick={() => setSelectedCuisine('All')} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" checked={selectedCuisine === 'All'} readOnly /> All
          </li>

          {/* American */}
          <li onClick={() => setSelectedCuisine('American')} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" checked={selectedCuisine === 'American'} readOnly /> American
          </li>

          {/* Asian */}
          <li onClick={() => setSelectedCuisine('Asian')} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" checked={selectedCuisine === 'Asian'} readOnly /> Asian
          </li>

          {/* Italian */}
          <li onClick={() => setSelectedCuisine('Italian')} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" checked={selectedCuisine === 'Italian'} readOnly /> Italian
          </li>

          {/* Mediterranean */}
          <li onClick={() => setSelectedCuisine('Mediterranean')} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input type="radio" checked={selectedCuisine === 'Mediterranean'} readOnly /> Mediterranean
          </li>
        </ul>
      </div>

      {/* Main content area for displaying recipes */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>
          {selectedCuisine === 'All'
            ? 'All Recipes'
            : `${selectedCuisine} Recipes`}
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                width: '150px',
                textAlign: 'center'
              }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
              <h4 style={{ margin: '0.5rem 0' }}>{recipe.title}</h4>
              <p style={{ margin: 0 }}>{recipe.cuisine}</p>
            </div>
          ))}
        </div>
      </div>
      <div class="subscribe-footer">
    <h2>KEEP EATING!</h2>
    <label>SUBSCRIBE</label>
    <input type="email" placeholder="Email address" />
    <p>© 2025, Community Eats</p>
    <p>(810) 246 - 8357</p>
    <p>1234 Michigan Avenue, Dearborn, MI 48124</p>
  </div>
    </div>
  );
}

export default FilterMenu;
