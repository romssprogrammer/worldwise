import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useAnimationStudio } from "../contexts/AnimationStudioContext";

function CountryList() {
  const { animationStudios, isLoading } = useAnimationStudio();
  // did animation datas are loading?
  if (isLoading) return <Spinner />;

  if (!animationStudios.length)
    return (
      <Message message="Add a animation studio for this click on a city on the map" />
    );
  const countries = animationStudios.reduce((arr, currCity) => {
    // is the City exist in the array
    if (!arr.map((el) => el.country).includes(currCity.country))
      return [...arr, { country: currCity.country, emoji: currCity.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
