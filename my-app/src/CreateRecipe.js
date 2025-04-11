import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, push, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { db } from "./firebaseConfig"; // Fixed import

export default function CreateRecipe() {
  const { currentUser } = useAuth();
  const [ingredientCount, setIngredientCount] = useState(1);
  const [stepCount, setStepCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const addIngredient = () => {
    if (ingredientCount < 10) {
      setIngredientCount(ingredientCount + 1);
    }
  };

  const removeIngredient = () => {
    if (ingredientCount > 1) {
      setIngredientCount(ingredientCount - 1);
    }
  };

  const addStep = () => {
    if (stepCount < 10) {
      setStepCount(stepCount + 1);
    }
  };

  const removeStep = () => {
    if (stepCount > 1) {
      setStepCount(stepCount - 1);
    }
  };

  const onSubmit = async (data) => {
    const ingredients = [];
    for (let i = 0; i < ingredientCount; i++) {
      if (data[`ingredient${i}`]) {
        ingredients.push(data[`ingredient${i}`]);
      }
    }

    const steps = [];
    for (let i = 0; i < stepCount; i++) {
      if (data[`step${i}`]) {
        steps.push(data[`step${i}`]);
      }
    }

    const recipeData = {
      name: data.recipeName,
      ingredients,
      steps,
      imageUrl: data.imageUrl || "",
      createdAt: new Date().toISOString(),
      createdBy: {
        uid: currentUser.uid,
        name: currentUser.displayName || currentUser.email
      }
    };

    try {
      const recipesRef = ref(db, 'recipes');
      const newRecipeRef = push(recipesRef);
      await set(newRecipeRef, recipeData);

      setSuccessMessage("Recipe submitted successfully!");
      reset();
      setIngredientCount(1);
      setStepCount(1);
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Error submitting recipe. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {currentUser && (
        <div style={styles.userProfile}>
          {currentUser.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              style={styles.profilePic} 
            />
          )}
          <span style={styles.userName}>
            {currentUser.displayName || currentUser.email}
          </span>
        </div>
      )}
      
      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <h1 style={styles.title}>Add New Recipe</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* Recipe Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Recipe Name*</label>
          <input
            {...register("recipeName", { required: "Recipe name is required" })}
            placeholder="Enter recipe name"
            style={styles.input}
          />
          {errors.recipeName && <span style={styles.error}>{errors.recipeName.message}</span>}
        </div>

        {/* Image URL */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL</label>
          <input
            {...register("imageUrl")}
            placeholder="Enter image URL (optional)"
            style={styles.input}
          />
        </div>

        {/* Ingredients */}
        <div style={styles.formGroup}>
          <div style={styles.sectionHeader}>
            <label style={styles.label}>Ingredients*</label>
            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={removeIngredient}
                style={styles.smallButton}
                disabled={ingredientCount <= 1}
              >
                -
              </button>
              <button 
                type="button" 
                onClick={addIngredient}
                style={styles.smallButton}
                disabled={ingredientCount >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {Array.from({ length: ingredientCount }).map((_, index) => (
            <div key={index} style={styles.dynamicField}>
              <input
                {...register(`ingredient${index}`, { required: index === 0 ? "At least one ingredient is required" : false })}
                placeholder={`Ingredient ${index + 1}`}
                style={styles.input}
              />
              {errors[`ingredient${index}`] && <span style={styles.error}>{errors[`ingredient${index}`].message}</span>}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={styles.formGroup}>
          <div style={styles.sectionHeader}>
            <label style={styles.label}>Steps*</label>
            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={removeStep}
                style={styles.smallButton}
                disabled={stepCount <= 1}
              >
                -
              </button>
              <button 
                type="button" 
                onClick={addStep}
                style={styles.smallButton}
                disabled={stepCount >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {Array.from({ length: stepCount }).map((_, index) => (
            <div key={index} style={styles.dynamicField}>
              <textarea
                {...register(`step${index}`, { required: index === 0 ? "At least one step is required" : false })}
                placeholder={`Step ${index + 1}`}
                style={{...styles.input, minHeight: '60px'}}
                rows={3}
              />
              {errors[`step${index}`] && <span style={styles.error}>{errors[`step${index}`].message}</span>}
            </div>
          ))}
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    position: "relative"
  },
  title: {
    color: "#FF9800",
    textAlign: "center",
    marginBottom: "2rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box"
  },
  dynamicField: {
    marginBottom: "1rem"
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem"
  },
  smallButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    cursor: "pointer",
    fontSize: "1rem"
  },
  submitButton: {
    background: "#FF9800",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem"
  },
  error: {
    color: "red",
    fontSize: "0.8rem"
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
    textAlign: "center"
  },
  userProfile: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #FF9800'
  },
  userName: {
    fontWeight: 'bold',
    color: '#333'
  }
};