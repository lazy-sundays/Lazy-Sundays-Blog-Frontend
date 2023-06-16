import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';
import Home from './Home/Home';
import Error from './Error/Error';
import AboutUs from './AboutUs/AboutUs';
import Archive from './Archive/Archive';
import Article from './Article/Article';
import Author from './Author/Author';

import './App.css';


function App() {

  // add theme utilities to body
  document.body.classList.add("bg-white")
  document.body.classList.add("text-slate-900");
  document.body.classList.add("dark:bg-slate-800");
  document.body.classList.add("dark:text-slate-200");


  return (
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/articles' element={<Archive />} />
            <Route path='/articles/:id' element={<Article />} />
            <Route path='/authors/:id' element={<Author />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </Router>
  );
}

export default App;
