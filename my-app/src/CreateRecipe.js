import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateRecipe = () => {
  // Basic text fields
  const [recipeName, setRecipeName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Arrays for dynamic ingredients & steps
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  // Separate fields for cuisineType and foodType
  const [cuisineType, setCuisineType] = useState('');
  const [foodType, setFoodType] = useState('');

  // Optional: diet (omnivore/herbivore)
  const [diet, setDiet] = useState('omnivore');

  // Add more ingredient fields dynamically
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  // Add more step fields dynamically
  const handleAddStep = () => {
    setSteps([...steps, '']);
  };
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  // Submit the new recipe to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeName.trim()) {
      alert('Recipe name is required!');
      return;
    }

    try {
      await addDoc(collection(db, 'recipes'), {
        name: recipeName,
        imageUrl: imageUrl || '',
        ingredients: ingredients.filter((ing) => ing.trim() !== ''),
        steps: steps.filter((st) => st.trim() !== ''),
        cuisineType: cuisineType || 'Unspecified',
        foodType: foodType || 'Unspecified',
        diet: diet, // "omnivore" or "herbivore"
      });

      // Reset form (optional)
      setRecipeName('');
      setImageUrl('');
      setIngredients(['']);
      setSteps(['']);
      setCuisineType('');
      setFoodType('');
      setDiet('omnivore');
      alert('Recipe created successfully!');
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe. See console for details.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        {/* Recipe Name */}
        <label>Recipe Name*</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />

        {/* Image URL */}
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        {/* Ingredients (dynamic) */}
        <label>Ingredients*</label>
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
          >
            <input
              type="text"
              value={ing}
              onChange={(e) => handleIngredientChange(idx, e.target.value)}
              style={{ flex: '1' }}
            />
            {/* Button to add more fields (only on last row) */}
            {idx === ingredients.length - 1 && (
              <button
                type="button"
                onClick={handleAddIngredient}
                style={{ marginLeft: '5px' }}
              >
                +
              </button>
            )}
          </div>
        ))}

        {/* Steps (dynamic) */}
        <label>Steps*</label>
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
          >
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(idx, e.target.value)}
              style={{ flex: '1' }}
            />
            {/* Button to add more fields (only on last row) */}
            {idx === steps.length - 1 && (
              <button
                type="button"
                onClick={handleAddStep}
                style={{ marginLeft: '5px' }}
              >
                +
              </button>
            )}
          </div>
        ))}

        {/* Cuisine Type */}
        <label>Cuisine Type</label>
        <select
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="">-- Select Cuisine --</option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="Italian">Italian</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
        </select>

        {/* Food Type */}
        <label>Food Type</label>
        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="">-- Select Food Type --</option>
          <option value="Burgers">Burgers</option>
          <option value="Pastas">Pastas</option>
          <option value="Salads">Salads</option>
          <option value="Steaks">Steaks</option>
          <option value="Tacos">Tacos</option>
        </select>

        {/* Optional: Diet Radio Buttons */}
        <label>Diet</label>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="diet"
              value="omnivore"
              checked={diet === 'omnivore'}
              onChange={(e) => setDiet(e.target.value)}
            />
            Omnivore
          </label>
          <label>
            <input
              type="radio"
              name="diet"
              value="herbivore"
              checked={diet === 'herbivore'}
              onChange={(e) => setDiet(e.target.value)}
            />
            Herbivore
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{ backgroundColor: 'orange', color: '#fff', padding: '10px 20px', border: 'none' }}
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
