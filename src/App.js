import { HashRouter } from "react-router-dom"
import routes from './routes.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        {routes}
        {/* <Checkerboard /> */}
      </HashRouter>

    </div>
  );
}

export default App;
