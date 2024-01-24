import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreatePodcast from "./components/createPodcast/CreatePodcast";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />} ></Route>
                    <Route path="/create-podcast" element={<CreatePodcast />} ></Route>
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
