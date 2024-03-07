import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import Footer from "./Footer";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default SideBar;
