import React from 'react';

function Navbar() {
  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to log out?');

    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <>
      <nav className="bg-blue-200 dark:bg-black-800 p-2  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              TaskApp
            </span>
          </a>

          <div className=" md:block md:w-auto rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600" id="navbar-solid-bg">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
