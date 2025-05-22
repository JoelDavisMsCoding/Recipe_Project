import React, { useState, useEffect } from 'react';
import './Recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json(); //data has to be in the form of an array not an object.
        console.log(json); // ← double-check here
        setRecipes(json.food_recipes); //This line of code is where the name of the table from the database goes.
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes(); //Calling the function inside of the useEffect method which will update the page automatically when a recipe is added
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error?.message || 'Something went wrong!'}</p>;

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <ul>
      {recipes.map(item => (
        <li key={item.id || item.food} style={{ marginBottom: '1rem' }}>
        <strong>{item.food}</strong> 
      </li>
      ))}
    </ul>
  );
}

export default Recipes;