import styles from "./styles/Main.module.css";
import { Navigate, Outlet } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";
import useSession from "@/hooks/useSession";
import Menu from "@/components/Menu/Menu";

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
          <span onClick={() => location.assign("/")}>Chats</span>
          <span onClick={() => location.assign("/users")}>Users</span>
          <span onClick={() => location.assign("/groups")}>Groups</span>
        </nav>
        <Menu
          options={[
            {
              text: "View profile",
              handler: () => location.assign("/profile"),
            },
            {
              text: "Create group",
              handler: () => location.assign("/groups/new"),
            },
            {
              text: "Logout",
              handler: () => sessionHandler.logout(),
            },
          ]}
        />

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
