import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroComponent from './HeroComponent';

function HomePage({ githubUserData, searchGithubUser }) {
  return (
    <div className='main-page'>
      <Header searchGithubUser={searchGithubUser} />
      <div className="topnav">
        <a href="/contact">Contact</a>
        {/* <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a> */}
      </div>
      <HeroComponent githubUserData={githubUserData} />
      <Footer />
    </div>
  );
}

export default HomePage;
