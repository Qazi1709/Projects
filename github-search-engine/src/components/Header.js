import Search from "./Search";

function Header({ displaySearchBar, searchGithubUser }) {
  if (displaySearchBar === undefined) {
    displaySearchBar = true;
  }

  return (
    <div className="header">
      <h1>Github Search Engine</h1>
      {displaySearchBar ? <Search searchGithubUser={searchGithubUser} /> : null}
    </div>
  );
}

export default Header;
