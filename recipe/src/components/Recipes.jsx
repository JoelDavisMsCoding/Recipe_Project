import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //needed for slide show
import { Carousel } from 'react-responsive-carousel'; //needed for slide show

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
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

      {/* Slide Show */}
      <div className="mb-4">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          stopOnHover={false}
        >
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/74544-default.jpg?im=AspectCrop=(700,394);Resize=(700,394)"
              alt="Chicken Alfredo"
            />
          </div>
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/109338-default.jpg?im=AspectCrop=(497,280);Resize=(497,280)"
              alt="Mediterranean Chicken"
            />
          </div>
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/100664-default.jpg?im=AspectCrop=(700,394);Resize=(700,394)"
              alt="Pasta Asald"
            />
          </div>
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/70498-default.jpg?im=AspectCrop=(497,280);Resize=(497,280)"
              alt="Peach Cobbler"
            />
          </div>
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/109364-default.png?im=AspectCrop=(700,394);Resize=(700,394)"
              alt="Banana Bread"
            />
          </div>
          <div>
            <img
              src="https://assets.unileversolutions.com/recipes-v3/189316-default.jpg?im=AspectCrop=(700,394);Resize=(700,394)"
              alt="Lasagna"
            />
          </div>
        </Carousel>
      </div>

      <h2 className="browseRecipes text-center">Browse Recipes</h2>
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
