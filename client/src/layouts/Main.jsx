import { Navigate, Outlet } from "react-router-dom";
import "@/utils/css/layouts.css";
import styles from "./styles/Main.module.css";
import sessionHandler from "@/handlers/sessionHandler";

export default function Main() {
  if (!sessionHandler.user()) return <Navigate to={"/login"} />;

  return (
    <div className={`layout ${styles.main}`}>
      <aside>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>
        <nav>
          <a href="/">Friends</a>
          <a href="/users">Users</a>
          <a href="/groups">Groups</a>
        </nav>
        <footer>
          <button onClick={() => sessionHandler.logout()}>Logout</button>
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
