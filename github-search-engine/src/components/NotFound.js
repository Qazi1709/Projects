
// function NotFound() {
//     return (
//         <>
//             <div className="notfound">
//                 <h1>404</h1>
//             </div >
//             <p className="para">Sorry, the page you are looking for does not exist.</p>


//         </>
//     )
// }

// export default NotFound

import React from 'react';
import Loading from './Loading'; // Import the loading animation component

function NotFound() {
  const isLoading = false; // Set this to true if loading is needed

  return (
    <>
      {isLoading ? (
        <Loading /> // Display the loading animation component
      ) : (
        <div className="notfound">
          <h1>404</h1>
        </div>
      )}
      <p className="para">Sorry, the page you are looking for does not exist.</p>
    </>
  );
}

export default NotFound;
