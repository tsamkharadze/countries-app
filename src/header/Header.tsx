import "./Header.css";
import logo from "./globe-2-svgrepo-com.svg";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <p>CountryScope</p>
      </div>
      <div className="nav">
        <p>Home</p>
        <p>Explore Countries</p>
        <p>Continents</p>
        <p>About</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="search"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};
export default Header;
