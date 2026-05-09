import { Outlet } from "react-router-dom";
import "@/utils/css/layouts.css";
import styles from "./styles/Default.module.css";

export default function Default() {
  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          Developed by{" "}
          <a href="https://github.com/cesar-a-delacruz">César De La Cruz</a>
        </p>
      </footer>
    </div>
  );
}
