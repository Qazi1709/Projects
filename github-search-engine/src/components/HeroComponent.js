// import React from 'react';
// import { Link } from 'react-router-dom';

// function HeroComponent({ githubUserData }) {
//   return (
//     <div className="hero">
//       {githubUserData.length ? (
//         githubUserData.map((ele, index) => (
//           <div className="card" key={index}>
//             <h2>{ele.login}</h2>
//             <img src={ele.avatar_url} height='200px' alt={`${ele.login}'s avatar`} />
//             <Link to={`/user/${ele.login}`} className='btn3'>
//               Git Profile
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>No User Found</p>
//       )}
//     </div>
//   );
// }

// export default HeroComponent;

import React from 'react';
import { Link } from 'react-router-dom';

function HeroComponent({ githubUserData, isLoading }) {
  return (
    <div className='flex justify-center content-center mt-60 mb-20'>
      <div className="w-2/3 grid grid-cols-5 gap-4">
        {isLoading ? (
          <p>Loading...</p> // Replace with your loading animation component
        ) : (
          githubUserData.length ? (
            githubUserData.map((ele, index) => (
              <div className="card" key={index}>
                <h2>{ele.login}</h2>
                <img src={ele.avatar_url} height='200px' alt={`${ele.login}'s avatar`} />
                <Link to={`/user/${ele.login}`} className='btn3'>
                  Git Profile
                </Link>
              </div>
            ))
          ) : (
            <p>No User Found</p>
          )
        )}
      </div>
    </div>

  );
}

export default HeroComponent;
