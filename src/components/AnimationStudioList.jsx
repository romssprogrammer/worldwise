import AnimationStudioItem from "./AnimationStudioItem";
import styles from "./AnimationStudioList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useAnimationStudio } from "../contexts/AnimationStudioContext";

function AnimationStudioList() {
  const { animationStudios, isLoading } = useAnimationStudio();
  if (isLoading) return <Spinner />;
  if (!animationStudios.length)
    return (
      <Message message="Add a animation studio for this click on a city on the map" />
    );
  return (
    <ul className={styles.animationStudioList}>
      {animationStudios.map((animationStudio) => (
        <AnimationStudioItem
          key={animationStudio.id}
          animationStudio={animationStudio}
        />
      ))}
    </ul>
  );
}

export default AnimationStudioList;
