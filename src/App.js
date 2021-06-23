import { HashRouter } from "react-router-dom"
import routes from './routes.js';
import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <HashRouter>
        {routes}
        {/* <Checkerboard /> */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
        />
      </HashRouter>
    </div>
  );
}

export default App;
