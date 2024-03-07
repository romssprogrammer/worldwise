import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Link>
        <span>{country.emoji}</span>
        <span>{country.country}</span>
      </Link>
    </li>
  );
}

export default CountryItem;
