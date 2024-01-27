import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroComponent from './HeroComponent';

function HomePage({ githubUserData, searchGithubUser }) {
  return (
    <div className='main-page'>
      <div className='fixed top-0 w-full z-50'>
        <Header searchGithubUser={searchGithubUser} />
        <div className="topnav fixed top-0 w-full z-50">
          <a href=""></a>
          {/* Add your links or content for topNav here */}
          {/* <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a> */}
        </div>
      </div>
      <HeroComponent githubUserData={githubUserData} />
    </div>

  );
}

export default HomePage;
