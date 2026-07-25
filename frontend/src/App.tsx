import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routing from "./Routing";
import Login from "./components/LoginSignup/Login";
import Landing from "./components/Landing/Landing";
import Register from "./components/LoginSignup/Register";
import axios from "axios";
import Search from "./components/Navbar/Search.tsx";
import VideosList from "./components/VideosPage/VideosList.tsx";
import SkillRequests from "./components/SkillRequest/Skillrequest.tsx";
import Profile from "./components/Profile/Profile.tsx";
import UploadVideo from "./components/VideosPage/VideoUploadPage.tsx";
import VideoDetail from "./components/VideosPage/VideoPlayer.tsx";
import PremiumVideos from "./components/PremiumPage/Premium.tsx";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";
import PublicOnlyRoute from "./utils/PublicOnlyRoute.tsx";

axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Layout */}
        <Route path="/" element={<Routing />}>
          {/* Public Landing */}
          <Route path="/" element={<Landing />} />

          {/* Protected Pages */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="/premiumvideos"
            element={
              <ProtectedRoute>
                <PremiumVideos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <VideosList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skill-requests"
            element={
              <ProtectedRoute>
                <SkillRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-video"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/video/:id"
            element={
              <ProtectedRoute>
                <VideoDetail />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
