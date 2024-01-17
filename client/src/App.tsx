import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";

const App = () => {
    return (
        <>
            <Navigation />
            <h1>Hello HOME</h1>
            <Routes>
                <Route path="/login" ></Route>
                <Route path="/register" element={<Register />} ></Route>
            </Routes>
        </>
    )
}

export default App
