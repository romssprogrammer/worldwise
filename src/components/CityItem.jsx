import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useAnimationStudio } from "../contexts/AnimationStudioContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useAnimationStudio();
  const { cityName, cityEmoji, date, id, position } = city;
  function handleclick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem}${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{cityEmoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        TIME ZONE
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleclick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
