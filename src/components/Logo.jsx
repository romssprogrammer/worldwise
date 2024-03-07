import styles from "./Logo.module.css";

function Logo() {
  return (
    <img
      src="public/AnimationWorldWise_logo.png"
      alt="AnimationStudioWise logo"
      className={styles.logo}
    />
  );
}

export default Logo;
