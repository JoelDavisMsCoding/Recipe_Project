import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Recipe_Ingredient() {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${id}`);
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        const data = await response.json();
        console.log(data)
        setRecipe(data.food_recipes[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const ingredients = recipe.ingredients.split(',').map(i => i.trim()); //This takes string of ingrdients adding them to an array.

//Delete Method starts here
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the recipe');
      }

      const result = await response.json();
      console.log(result.message); // Optional: log success message

      // Redirect back to recipe list after deletion
      window.alert(result.message);
      window.location.href = '/recipes'; // or use `navigate()` from react-router
    }
    catch (err) {
      console.error('Error:', err);
      window.alert('There was a problem deleting the recipe.');
    }
  };

  return (
    <div className="container">
      <div className="col-12 col1">
      <Link to="/recipes">← Back to Recipes</Link>
      <h5 className="recipe-item">{recipe.food}</h5>
      <h5>Ingredients:</h5>
      <p>{recipe.ingredients}</p>
      {/* <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul> */}
      </div>
      <div className="col-12 col2">
      <button onClick={handleDelete} className="btn deleteBttn">
        Delete Recipe
      </button>
      <Link to={`/edit/${id}`} className="btn editBttn">Edit Recipe</Link>
      </div>
    </div>  
  );
}

export default Recipe_Ingredient;
