import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import VideogameDetail from './components/VideogameDetail';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
    <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={CreateGame} />
        <Route exact path='/videogames/:id' component={VideogameDetail} />
    </div>
    </BrowserRouter>
  );
}

export default App;
