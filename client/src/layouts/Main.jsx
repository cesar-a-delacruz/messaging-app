import { Navigate, Outlet } from "react-router-dom";
import styles from "./styles/Main.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import useSession from "@/hooks/useSession";

export default function Main() {
  const isUserLogged = useSession(true);
  if (!isUserLogged) return <Navigate to={"/login"} />;

  return (
    <div className={`layout ${styles.main}`}>
      <aside>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>

        <nav>
          <span onClick={() => location.assign("/")}>My Chats</span>
          <span onClick={() => location.assign("/users")}>Users</span>
          <span onClick={() => location.assign("/groups")}>Groups</span>
        </nav>
        <div className={styles.options}>
          <button onClick={() => location.assign("/profile/user")}>
            Profile
          </button>
          <button onClick={() => location.assign("/groups/new")}>
            Create Group
          </button>
          <button onClick={() => sessionHandler.logout()}>Logout</button>
        </div>

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
