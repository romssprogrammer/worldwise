import { Link } from "react-router-dom";
import styles from "./AnimationStudioItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function AnimationStudioItem({ animationStudio }) {
  const { studioName, date, logoStudio, id } = animationStudio;
  return (
    <li className={styles.AnimationStudioItem}>
      <Link to={`${id}`} className={styles.AnimationStudioItemLink}>
        {logoStudio ? (
          <img
            className={styles.logoStudioItem}
            src={logoStudio}
            alt={` ${studioName}  logo`}
          />
        ) : (
          ""
        )}
        <h3 className={styles.name}>{studioName}</h3>
      </Link>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default AnimationStudioItem;
