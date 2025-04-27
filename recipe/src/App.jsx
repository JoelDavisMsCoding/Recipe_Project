
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/ingredients">Ingredients</Link>
          </li>
          <li>
            <Link to="/insert">Insert</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default App
