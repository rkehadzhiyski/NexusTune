import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Navigation from "./components/navigation/Navigation";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreatePodcast from "./components/createPodcast/CreatePodcast";
import UserProfile from "./components/userProfile/UserProfile";
import CreateEpisode from "./components/createEpisode/CreateEpisode";
import DetailsPodcast from "./components/detailsPodcast/DetailsPodcast";
import DetailsEpisode from "./components/detailsEpisode/detailsEpisode";
import Footer from "./components/footer/Footer";
import AuthGuard from './components/guards/AuthGuard';
import Browse from "./components/browse/Browse";

const App = () => {
    return (
        <AuthProvider>
            <div className='main'>
                <Navigation />
                <div className='inner-container'>
                    <Routes>
                        <Route path="/" element={<Home />} ></Route>
                        <Route path="/browse" element={<Browse />} ></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />} ></Route>
                        <Route path="/podcast/:podcastId" element={<DetailsPodcast />} ></Route>
                        <Route path="/episode/:podcastName/:episodeId" element={<DetailsEpisode />} ></Route>

                        <Route element={<AuthGuard />}>
                            <Route path="/user-profile" element={<UserProfile />}></Route>
                            <Route path="/create-podcast" element={<CreatePodcast />} ></Route>
                            <Route path="/create-episode" element={<CreateEpisode />} ></Route>
                        </Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App