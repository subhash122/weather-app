import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { NavRoutes } from "./Routes/NavRoutes";
import { WeatherProvider } from "./components/contexts/WeatherContext";

function App() {
  return (
    <>
      <ToastContainer position="top-center"/>
      <WeatherProvider>
        <Router>
          <NavRoutes></NavRoutes>
        </Router>
      </WeatherProvider>
    </>
  );
}

export default App;
