import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />} ></Route>
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
