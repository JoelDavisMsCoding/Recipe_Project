// Import React and necessary hooks from react
import React, { useState, useEffect } from 'react';

// Import Link from react-router-dom to allow navigation between pages
import { Link } from 'react-router-dom';

import './Recipes.css';

// Import the Carousel styles from the package so the slideshow is styled correctly
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import the Carousel component itself from the library
import { Carousel } from 'react-responsive-carousel';

function Recipes() {
  // State to hold all fetched recipes
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // State to store the user’s input in the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect runs once on component mount to fetch data from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes from the backend API using the Vite environment variable
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);

        // If response is not okay (status not in 200–299), throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert the response to JSON
        const json = await response.json();

        // Set the recipe data (expects json.food_recipes to be an array)
        setRecipes(json.food_recipes);
      } catch (error) {
        // If error occurs during fetch, store it in state
        setError(error);
      } finally {
        // Whether successful or not, mark loading as false
        setLoading(false);
      }
    };

    // Call the async function to fetch recipes
    fetchRecipes();
  }, []); // Empty dependency array → run only once when the component mounts

  // Filter recipes based on search input (case insensitive match against the 'food' field)
  const filteredRecipes = recipes.filter((item) =>
    item.food?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If still loading, show a loading message using Bootstrap classes
  if (loading)
    return <div className="alert alert-info text-center">Loading recipe...</div>;

  // If an error occurred during fetch, display it
  if (error)
    return <div className="alert alert-danger text-center">Error: {error.message}</div>;

  // Render the main UI of the component
  return (
    <div className="recipes-container">

      {/* 🎞️ Image carousel for featured recipes */}
      <div className="mb-4">
        <Carousel
          autoPlay              // Automatically play the slideshow
          infiniteLoop          // Loop back to the beginning when finished
          interval={4000}       // Show each image for 4000ms (4s)
          showThumbs={false}    // Don't show thumbnail images
          showStatus={false}    // Don't show current slide number
          showIndicators={true} // Show navigation dots
          stopOnHover={false}   // Keep auto-playing even when hovered
        >
          {/* Each <div> inside Carousel is one slide */}
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
              alt="Pasta Salad"
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

      {/* 🧾 Header above recipe list */}
      <h2 className="browseRecipes text-center">Browse Recipes</h2>

      {/* 🔍 Search bar input */}
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchTerm}                       // Controlled input: reflects `searchTerm` state
        onChange={(e) => setSearchTerm(e.target.value)} // Update state as user types
        className="search-bar"                  // Custom styling from CSS
      />

      {/* 📋 List of filtered recipes or message if none found */}
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

// Export the component so it can be imported and used in other files
export default Recipes;
