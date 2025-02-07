import Navbar from "@/components/navbar/Navbar";
import SearchBar from "@/components/search-bar/SearchBar";
import styles from "./HomePage.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
