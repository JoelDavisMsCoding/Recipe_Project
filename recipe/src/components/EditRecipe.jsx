import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EditRecipe() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    food: '',
    ingredients: '',
    instructions: '',
    image_url:''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/${id}`);
        if (!res.ok) throw new Error('Recipe not found');
        const data = await res.json();
        const recipe = data.food_recipes[0];
        setFormData({
          food: recipe.food,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          image_url: recipe.image_url
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Update failed');
      const result = await res.json();
      alert(result.message);
      window.location.href = `/recipes/${id}`; // Redirect to updated recipe
    } catch (err) {
      alert('Error updating recipe.');
      console.error(err);
    }
  };

  if (loading)
    return <div className="alert alert-info text-center">Loading recipe...</div>;

  if (error)
    return <div className="alert alert-danger text-center">Error: {error.message}</div>;

  return (
  <div className="edit-recipe-container">
    <Link to={`/recipes/${id}`}>← Back to Recipes</Link>
    <h2 className="edit-recipe-title">Edit Recipe</h2>

    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <div className="form-group">
        <label className="form-label">Recipe Name</label>
        <input
          type="text"
          name="food"
          value={formData.food}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Ingredients (comma separated)</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image_url</label>
        <input
          type="url"
          name="image_url"
          className="form-control"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button type="submit" className="form-button">Update Recipe</button>
    </form>
</div>
  );
}

export default EditRecipe;
