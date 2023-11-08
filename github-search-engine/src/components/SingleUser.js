// // import { Link, useParams } from "react-router-dom";
// // import { useEffect } from "react";
// // function User({ getSingleUserData, singleUserData }) {
// //     const { username } = useParams();
// //     const { name, avatar_url, bio, hireable, following, followers, company, location, blog } = singleUserData;

// //     // console.log(username);
// //     useEffect(() => {
// //         //Getting User Data and Repos Data
// //         getSingleUserData(username);
// //     }, []);
// //     return (
// //         <div className="single-user">
// //             <div className="side-2">
// //                 <h2>{name}</h2>
// //                 <img src={avatar_url} height={200} alt="profilepic" />
// //                 <h3>Bio : <p style={{ color: "black", textAlign: "left", fontSize: "large" ,display:"inline-block"}}>
// //                     {bio}
// //                 </p> </h3>

// //                 <h3 style={{ display: "inline" }}>Open for Hiring : </h3>
// //                 <p>
// //                     {hireable ? "✅" : "❌"}
// //                 </p>
// //                 <div className="fakeimg">
// //                     Followers : {followers}
// //                 </div>
// //                 <div className="fakeimg" >
// //                     Following : {following}
// //                 </div>
// //                 <br />
// //                 {company && (
// //                     <>
// //                         <div className="fakeimg" >
// //                             Company : {company}
// //                         </div>
// //                         <br />
// //                     </>
// //                 )}
// //                 {location && (
// //                     <>
// //                         <div className="fakeimg" >
// //                             Location : {location}
// //                         </div>
// //                         <br />
// //                     </>
// //                 )}
// //                 {blog && (
// //                     <>
// //                         <div className="fakeimg">
// //                             Website : {blog}
// //                         </div>
// //                         <br />
// //                     </>
// //                 )}
// //                 <a href={`https://github.com/${username}`}>Go to GitHub Profile</a>
// //             </div>

// //             <div className="main">
// //                 <Link to="/">
// //                     <h2>Go Back</h2>
// //                 </Link>
// //                 {/* <center>
// //                     {repos ? (
// //                         <>
// //                             {repos.map((ele, i) => (
// //                                 <div className="repos-class" key={i}>
// //                                     <a href={ele.html_url} target="_blank" class="repo-link">
// //                                         <h2>{ele.name}</h2>
// //                                     </a>
// //                                     <p style={{ color: "black" }}>{ele.description}</p>
// //                                 </div>
// //                             ))}
// //                         </>
// //                     ) : null}
// //                 </center> */}
// //             </div>
// //         </div>
// //     );
// // }
// // export default User;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function UserProfile() {
//     const { username } = useParams();
//     const [userDetails, setUserDetails] = useState(null);
//     const [repos, setRepos] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user details
//                 const userDetailsResponse = await axios.get(`https://api.github.com/users/${username}`);
//                 setUserDetails(userDetailsResponse.data);

//                 // Fetch user's top 5 repos
//                 const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
//                 setRepos(reposResponse.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, [username]);

//     if (!userDetails) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>

//             <div className="single-user">

//                <div className="profile-page">
//                     <center>
//                         <img
//                             className="img-2"
//                             src={userDetails.avatar_url}
//                             alt={userDetails.login}
//                             height="200px"
//                         />

//                         <h1 className="name">{userDetails.name}</h1>

//                         <div className="user-details">
//                             <table className="user-details-table">
//                                 <tbody>
//                                     <tr>
//                                         <th>Username</th>
//                                         <td>{userDetails.login}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Company</th>
//                                         <td>{userDetails.company || "Not found"}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Location</th>
//                                         <td>{userDetails.location || "Not found"}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Followers</th>
//                                         <td>{userDetails.followers}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Following</th>
//                                         <td>{userDetails.following}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Hireable</th>
//                                         <td>{userDetails.hireable ? "✅" : "❌"}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <a
//                                 href={userDetails.html_url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="btn2"
//                             >
//                                 Visit GitHub Profile
//                             </a>
//                             <h2 className="top5">Top 5 Repositories:</h2>
//                             <table className="user-details-table">
//                                 {" "}
//                                 {/* Use the same table styling */}
//                                 <tbody>
//                                     {repos.map((repo) => (
//                                         <tr key={repo.id}>
//                                             <td>
//                                                 <a
//                                                     href={repo.html_url}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                 >
//                                                     {repo.name}
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <Link to="/" className="btn1">
//                     Go to Main Page
//                 </Link>
//                     </center>
//                 </div>

//             </div>
//         </>
//     );
// }

// export default UserProfile;


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'; // Import the loading animation component

function UserProfile() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const userDetailsResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUserDetails(userDetailsResponse.data);

        
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
        setRepos(reposResponse.data);

        // Set isLoading to false once data is fetched
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  if (isLoading) {
    return <Loading />; // Display the loading animation component
  }

  // Return the JSX content
  return (
    <div className="single-user">
      <div className="profile-page">
        <center>
          <img
            className="img-2"
            src={userDetails.avatar_url}
            alt={userDetails.login}
            height="200px"
          />
          <h1 className="name">{userDetails.name}</h1>
          <div className="user-details">
            <table className="user-details-table">
              <tbody>
                <tr>
                  <th>Username</th>
                  <td>{userDetails.login}</td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>{userDetails.company || "Not found"}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{userDetails.location || "Not found"}</td>
                </tr>
                <tr>
                  <th>Followers</th>
                  <td>{userDetails.followers}</td>
                </tr>
                <tr>
                  <th>Following</th>
                  <td>{userDetails.following}</td>
                </tr>
                <tr>
                  <th>Hireable</th>
                  <td>{userDetails.hireable ? "✅" : "❌"}</td>
                </tr>
              </tbody>
            </table>
            <a
              href={userDetails.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn2"
              
            >
              Visit GitHub Profile
            </a>
            <h2 className="top5">Repositories:</h2>
            <table className="user-details-table">
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.id}>
                    <td>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/" className="btn1">
            Go to Main Page
          </Link>
        </center>
      </div>
    </div>
  );
}

export default UserProfile;
