import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';
import Home from './Home/Home';
import Error from './Error/Error';
import AboutUs from './AboutUs/AboutUs';
import Archive from './Archive/Archive';
import Article from './Article/Article';
import Author from './Author/Author';
import RandomArticle from './Common/RandomArticle';

import './App.css';


function App() {

  // add theme utilities to body
  document.body.classList.add("bg-bgprimary");
  document.body.classList.add("text-textprimary");

  return (
      <Router>
        <Navbar />
        <main className='mb-auto min-h-[calc(100vh-18.75rem)]'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            {/* <Route path='/the-archives' element={<Archive />} /> */}
            <Route path='/the-archives' element={<Navigate to='/error/501'/>} />
            <Route path='/articles/:slug' element={<Article />}/>
            <Route path='/articles' element={<Navigate to='/the-archives'/>}/>
            <Route path='/random-article' element={<RandomArticle />}/>
            <Route path='/authors/:slug' element={<Author />} />
            <Route path='/authors' element={<Navigate to='/about-us'/>}/>
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/error/:status' element={<Error />} />
            <Route path='*' element={<Navigate to='/error/404'/>} />
          </Routes>
        </main>
        <Footer />
      </Router>
  );
}

export default App;
