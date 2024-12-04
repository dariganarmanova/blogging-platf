import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import BlogCreate from './components/BlogCreate';
import LogPage from './components/LogPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogCreate />} />
        <Route path="/log" element={<LogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
