// import styles from "./Header.module.css";
// import logo from "./globe-2-svgrepo-com.svg";

import styles from "@/components/header/Header.module.css";
import logo from "@/components/header/globe-2-svgrepo-com.svg";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles["logo-img"]} />
        <p>CountryScope</p>
      </div>
      <div className={styles.nav}>
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
          className={styles.search}
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
