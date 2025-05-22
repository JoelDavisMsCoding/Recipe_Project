import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRecipe() {
  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api', {
        food,
        ingredients,
      });

      // Redirect to homepage after successful post
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error.response || error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Food</label>
          <input
            className="form-control"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Submit Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;