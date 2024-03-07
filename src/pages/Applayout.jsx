import Map from "../components/Map";
import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import User from "../components/User";
import styles from "./Applayout.module.css";
function Applayout() {
  return (
    <>
      <PageNav />
      <div className={styles.app}>
        <SideBar />
        <Map />
        <User />
      </div>
    </>
  );
}

export default Applayout;
