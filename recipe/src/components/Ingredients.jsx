import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  if (loading)
    return <div className="alert alert-info text-center">Loading recipe...</div>;

  if (error)
    return <div className="alert alert-danger text-center">Error: {error.message}</div>;

  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <ul>
      {recipes.map(item => (
        <li key={item.id} style={{ marginBottom: '1rem' }} className="ingredientPgeLi">
        <Link to={`/recipes/${item.id}`}> <strong className="foodTitle">{item.food}</strong> </Link>
        <p><span className="ingredientTitle">Ingredients:</span> {item.ingredients}</p>
        <p><span className="instructionTitle">Instructions:</span> {item.instructions}</p>
        {item.image_url && <img src={item.image_url} alt={item.food} style={{ maxWidth: '200px', borderRadius: '10px' }} />}
      </li>
      ))}
    </ul>
  );
}

export default Recipes;