import styles from "./styles/Main.module.css";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import sessionHandler from "@/handlers/sessionHandler";
import useSession from "@/hooks/useSession";
import Menu from "@/components/Menu/Menu";

export default function Main() {
  const isUserLogged = useSession(true);
  const [showMenu, setShowMenu] = useState(false);

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
        <Menu
          options={[
            {
              text: "View profile",
              handler: () => {
                location.assign("/profile/user");
                setShowMenu(false);
              },
            },
            {
              text: "Create group",
              handler: () => {
                location.assign("/groups/new");
                setShowMenu(false);
              },
            },
            {
              text: "Logout",
              handler: () => {
                sessionHandler.logout();
                setShowMenu(false);
              },
            },
          ]}
          visible={showMenu}
        />
        <div
          className={styles.menuButton}
          onClick={() => (!showMenu ? setShowMenu(true) : setShowMenu(false))}
        >
          . . .
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
