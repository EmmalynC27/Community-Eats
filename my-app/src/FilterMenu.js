import React, { useState } from 'React'; //usestate is so that the default state of filters are all or nothing.

function FilterMenu() {
// currently selected filter
const [selectedCuisine, setSelectedCuisine] = useState('All');

//array of cuisines type
const cuisines = ['American', 'Asian', 'Italian', 'Mediterranian'];


const filteredRecipes =
// decleration of filtered recipe that should hold the array once you select a specific recipe
selectedCuisine === 'All'
  ? allRecipes //should theoritically makes it so that the condition of filtered recipe is true
  : allRecipes.filter(recipe => recipe.cuisine === selectedCuisine); 


  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar for filters */}
      <div className="sidebar" style={{ width: '200px', padding: '1rem' }}>
        <h3>Filter</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {/* "All" option */}
          <li onClick={() => setSelectedCuisine('All')}>
            <input
              type="radio"
              checked={selectedCuisine === 'All'}
              readOnly
            />{' '}
            All
          </li>
          {/* Each cuisine option */}
          {cuisines.map(cuisine => (
            <li key={cuisine} onClick={() => setSelectedCuisine(cuisine)}>
              <input
                type="radio"
                checked={selectedCuisine === cuisine}
                readOnly
              />{' '}
              {cuisine}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="main-content" style={{ flex: 1, padding: '1rem' }}>
        <h2>
          {selectedCuisine === 'All' ? 'All Recipes' : `${selectedCuisine} Recipes`}
        </h2>

        {/* Display filtered recipes in a simple grid */}
        <div className="recipes-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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

