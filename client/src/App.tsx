import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";
import Home from "./components/home/Home";

const App = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home/>} ></Route>
                <Route path="/login" ></Route>
                <Route path="/register" element={<Register />} ></Route>
            </Routes>
        </>
    )
}

export default App
