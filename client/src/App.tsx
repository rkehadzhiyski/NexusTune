import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreatePodcast from "./components/createPodcast/CreatePodcast";
import UserProfile from "./components/userProfile/UserProfile";
import CreateEpisode from "./components/createEpisode/CreateEpisode";

const App = () => {
    return (
        <AuthProvider>
            <div className='main'>
            <Navigation />
            <div className='inner-container'>
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />} ></Route>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
                    <Route path="/create-podcast" element={<CreatePodcast />} ></Route>
                    <Route path="/create-episode" element={<CreateEpisode />} ></Route>
                </Routes>
                </div>
            </div>
        </AuthProvider>
    )
}

export default App