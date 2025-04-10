import React, { useState } from 'react';

// Hard-coded sample data (not database)
const allRecipes = [
  { title: 'Classic American Burger', cuisine: 'American' },
  { title: 'Chicken Teriyaki', cuisine: 'Asian' },
  { title: 'Margherita Pizza', cuisine: 'Italian' },
  { title: 'Greek Salad', cuisine: 'Mediterranean' },
  { title: 'BBQ Ribs', cuisine: 'American' },
  { title: 'Sushi Platter', cuisine: 'Asian' },
  { title: 'Pasta Carbonara', cuisine: 'Italian' },
  { title: 'Falafel Wrap', cuisine: 'Mediterranean' }
];

function FilterMenu() {
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Not sure if this is the best way (went with true or false logic)
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
            <input
              type="radio"
              checked={selectedCuisine === 'Mediterranean'}
              readOnly
            />{' '}
            Mediterranean
          </li>
        </ul>
      </div>

      {/* Main content area for displaying recipes */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>
          {selectedCuisine === 'All'
            ? 'All Recipes'
            : `${selectedCuisine} Recipes`
          }
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                width: '150px',
                textAlign: 'left'
              }}
            >
              <h4>{recipe.title}</h4>
              <p>{recipe.cuisine}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
