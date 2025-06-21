import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setRecipes(json.food_recipes); // Assumes food_recipes is an array
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes by search term (case insensitive)
  const filteredRecipes = recipes.filter((item) =>
    item.food?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <div className="alert alert-info text-center">Loading recipe...</div>;

  if (error)
    return <div className="alert alert-danger text-center">Error: {error.message}</div>;

  return (
    <div className="recipes-container">
      <h2>Browse Recipes</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul className="recipe-list">
          {filteredRecipes.map((item) => (
            <li key={item.id} className="recipe-item">
              <Link to={`/recipes/${item.id}`}>
                <strong>{item.food}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recipes;
