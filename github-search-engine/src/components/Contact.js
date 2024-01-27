// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// function Contact() {
//   return (
//    <>
//    <Header displaySearchBar={false}/>
//    <div>
//     <h1> Contact Form</h1>
    
//     </div>
//     <Footer/>   
//     </>
   
//   )
// }

// export default Contact

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading'; // Import the loading animation component

function Contact() {
  const isLoading = false; // Set this to true if loading is needed

  return (
    <>
      <Header displaySearchBar={false} />
      {isLoading ? (
        <Loading /> // Display the loading animation component
      ) : (
        <div>
          <h1>Contact Form</h1>
        </div>
      )}
    </>
  );
}

export default Contact;
