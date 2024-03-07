import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="animationstudios">Animation Studios</NavLink>
        </li>
        <li>
          <NavLink to="videogamestudios">videogame studios</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
