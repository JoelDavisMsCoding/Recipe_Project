import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Ingredients from './components/Ingredients';
import AddRecipe from './components/AddRecipe';
import Recipe_Ingredient from './components/Recipe_Ingredient';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe_Ingredient />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  )
}

export default App;
