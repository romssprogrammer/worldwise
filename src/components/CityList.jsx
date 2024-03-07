import { useContext } from "react";
import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import { useAnimationStudio } from "../contexts/AnimationStudioContext";

function CityList() {
  const { animationStudios, isLoading } = useAnimationStudio();
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.countryList}>
      {animationStudios.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
