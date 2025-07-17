import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRecipe() {
  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image_url, setImage_url] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}`, {
        food,
        ingredients,
        instructions,
        image_url
      });
      

      //Get new recipe ID from response
      const newRecipeId = response.data.id;
      //Redirect to homepage after successful post
      navigate(`/recipes/${newRecipeId}`);
    } catch (error) {
      console.error('Error adding recipe:', error.response || error.message);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Name </label>
          <input
            className="form-control"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma separated)</label>
          <textarea
            className="form-control"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            rows="3"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image_url</label>
          <input
            type="url"
            className="form-control"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn submit-Btn">Submit Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;