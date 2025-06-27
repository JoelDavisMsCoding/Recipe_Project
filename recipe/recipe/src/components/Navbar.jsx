import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <>
      <nav className="container text-center ctNav">   
        <Link to="/recipes" className="recipesNav">Recipes</Link>
        <Link to="/ingredients" className="ingredientsNav">Ingredients</Link>
        <Link to="/addRecipe" className="addRecipeNav">Add Recipe</Link>
      </nav>
    </>
  )
}

export default Navbar;
