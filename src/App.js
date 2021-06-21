import {HashRouter} from "react-router-dom"
import routes from './routes.js';

function App() {
  return (
    <div className="App">
      <HashRouter>
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;
