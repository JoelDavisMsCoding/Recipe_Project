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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
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

  if (loading)
    return <div className="alert alert-info text-center">Loading recipe...</div>;

  if (error)
    return <div className="alert alert-danger text-center">Error: {error.message}</div>;

  const ingredients = recipe.ingredients.split(',').map(i => i.trim()); //This takes string of ingrdients adding them to an array.

//Delete Method starts here
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
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
      <h4 className="recipe-ingredient">{recipe.food}</h4>
      <p><span className="ingredientTitle">Ingredients:</span> {recipe.ingredients}</p>
      {/* <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul> */}
      <p><span className="instructionTitle">Instructions:</span> {recipe.instructions}</p>

      {recipe.image_url && (
        <div className="my-3">
          <img
            src={recipe.image_url}
            alt={recipe.food}
            style={{ maxWidth: '300px', borderRadius: '10px' }}
          />
        </div>
      )}
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