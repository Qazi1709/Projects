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
    <div className="hero">
      {isLoading ? (
        <isLoading /> // Display the loading animation component
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
  );
}

export default HeroComponent;
