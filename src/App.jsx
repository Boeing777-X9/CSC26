import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import JoinPage from './pages/JoinPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}
