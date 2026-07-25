import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routing from './Routing';
import Login from './components/LoginSignup/Login';
import Landing from './components/Landing/Landing';
import Register from './components/LoginSignup/Register';
import axios from 'axios';
import Search from "./components/Navbar/Search.tsx"
import VideosList from './components/VideosPage/VideosList.tsx';
import SkillRequests from './components/SkillRequest/Skillrequest.tsx';
import Profile from './components/Profile/Profile.tsx';
import UploadVideo from './components/VideosPage/VideoUploadPage.tsx';
import VideoDetail from './components/VideosPage/VideoPlayer.tsx';
import PremiumVideos from './components/PremiumPage/Premium.tsx';

axios.defaults.withCredentials = true;


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Routing />}>
          <Route path='/' element={<Landing />} />
          <Route path = "/search" element = {<Search/>} />
          <Route path = "/premiumvideos" element = {<PremiumVideos/>} />

          <Route path='/videos' element={<VideosList />}/>
          <Route path='/skill-requests' element={<SkillRequests />} />
          <Route path='/profile' element = {<Profile />} />
          <Route path = '/upload-video' element = {<UploadVideo />}/>
          <Route path= '/video/:id' element = {<VideoDetail />} />
            {/* <Route path='/products' element={<Products />} />
            <Route path='/products/foods' element={<Foods />} />
            <Route path='/products/drinks' element={<Drinks />} />
            <Route path='/products/desserts' element={<Desserts />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
