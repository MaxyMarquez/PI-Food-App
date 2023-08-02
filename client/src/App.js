import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import FormNewRecipe from './components/FormNewRecipe/FormNewRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-food-app-production.up.railway.app'

function App() {

  const location = useLocation();

  return (
    <div className='App'>
      {location.pathname === '/' ? undefined : <Nav />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='/create_recipe' element={<FormNewRecipe />} />
      </Routes>
    </div>

  );
}

export default App;
