import './App.css';
import {Home, Landing, Detail, FormCreate} from './views';
import {Route, useLocation} from 'react-router-dom';


function App() {

  const location = useLocation();
  

  return (
    <div className="App">     
      <Route exact path='/'>   <Landing /> </Route>
      <Route exact path = '/home'>   <Home    /> </Route>
      <Route path = '/home/:id'> <Detail  /> </Route>
      <Route path = '/create'>   <FormCreate    /> </Route>
     
    </div>
  );
}

export default App;
