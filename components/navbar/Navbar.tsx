import { HomeIcon } from "@/public/icons";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <HomeIcon />
      <div className={styles.navbarContent}>
        <h1>NPM Package Comparator</h1>
        <p>Compare & Recommend the best NPM package</p>
      </div>
    </div>
  );
};

export default Navbar;
