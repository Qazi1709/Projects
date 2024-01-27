import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import Contact from './components/Contact';
import SingleUser from './components/SingleUser';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import Footer from './components/Footer';

function App() {
  const [githubUserData, setGithubUserData] = useState([]);
  const [singleUserData, setSingleUserData] = useState({});

  async function getGithubUsers() {
    try {
      const response = await axios.get(`https://api.github.com/users`);
      setGithubUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSingleUserData(username) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setSingleUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchGithubUser(username) {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
      setGithubUserData(response.data.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGithubUsers();
  }, []);

  return (
    <div className='bdy'>
      <Routes>
        <Route path='/contact' element={<Contact />} />
        <Route path='/' element={<HomePage githubUserData={githubUserData} searchGithubUser={searchGithubUser} />} />
        <Route path='/user/:username' element={<SingleUser getSingleUserData={getSingleUserData} singleUserData={singleUserData} />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
