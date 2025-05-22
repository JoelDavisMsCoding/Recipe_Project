import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Ingredients from './components/Ingredients';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
