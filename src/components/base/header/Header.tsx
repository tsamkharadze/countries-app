import styles from "@/components/base/header/Header.module.css";
import logo from "@/components/base/header/globe-2-svgrepo-com.svg";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

const Header: React.FC = () => {
  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    return isActive ? styles["active-nav"] : styles["nav"];
  };

  return (
    <div className={styles.header}>
      <div>
        <Link className={styles.logo} to="/">
          <img src={logo} alt="logo" className={styles["logo-img"]} />

          <p>CountryScope</p>
        </Link>
      </div>
      <div className={styles.nav}>
        <NavLink className={handleActiveNav} to="/">
          <p>Home</p>
        </NavLink>
        <NavLink className={handleActiveNav} to="explore">
          <p>Explore Countries</p>
        </NavLink>
        <NavLink className={handleActiveNav} to="continents">
          <p>Continents</p>
        </NavLink>
        <NavLink className={handleActiveNav} to="/about">
          <p>About</p>
        </NavLink>
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
