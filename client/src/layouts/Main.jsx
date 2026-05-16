import { Outlet } from "react-router-dom";
import "@/utils/css/layouts.css";
import styles from "./styles/Main.module.css";

export default function Main() {
  return (
    <div className={`layout ${styles.main}`}>
      <aside>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>
        <nav>
          <a href="/">Users</a>
          <a href="/groups">Groups</a>
        </nav>
        <footer>
          <p>
            Developed by{" "}
            <a href="https://github.com/cesar-a-delacruz">César De La Cruz</a>
          </p>
        </footer>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
