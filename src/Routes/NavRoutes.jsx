
import { Routes, Route } from "react-router-dom";
import { WeatherDetails } from "../components/WeatherDetails";
import { Home } from "../components/Home";

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/details" element={<WeatherDetails />}></Route>
            <Route path="/" element={< Home />}></Route>
        </Routes>
    )
}
export { NavRoutes }
