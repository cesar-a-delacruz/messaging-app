import styles from "./styles/Main.module.css";
import { Navigate, Outlet } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";
import useSession from "@/hooks/useSession";
import Menu from "@/components/Menu/Menu";
import MenuContext from "@/contexts/MenuContext";
import {
  CircleUser,
  LogOut,
  MessageSquareMore,
  MessagesSquare,
  UserGroup,
  Users,
  UsersIcon,
} from "lucide-react";
import { CurrentMenuProvider } from "@/contexts/CurrentMenuContext";

export default function Main() {
  const isUserLogged = useSession(true);
  if (!isUserLogged) return <Navigate to={"/login"} />;

  return (
    <CurrentMenuProvider>
      <div className={`layout ${styles.main}`}>
        <aside>
          <h1 onClick={() => location.assign("/")}>
            {import.meta.env.VITE_TITLE}
            <MessagesSquare />
          </h1>

          <nav>
            <span onClick={() => location.assign("/")}>
              <MessageSquareMore /> Chats
            </span>
            <span onClick={() => location.assign("/users")}>
              <Users /> Users
            </span>
            <span onClick={() => location.assign("/groups")}>
              <UserGroup /> Groups
            </span>
          </nav>
          <MenuContext
            value={{
              options: [
                {
                  text: "View profile",
                  handler: () => location.assign("/profile"),
                  icon: <CircleUser />,
                },
                {
                  text: "Create group",
                  handler: () => location.assign("/groups/new"),
                  icon: <UsersIcon />,
                },
                {
                  text: "Logout",
                  handler: () => sessionHandler.logout(),
                  icon: <LogOut />,
                },
              ],
              render: true,
            }}
          >
            <Menu />
          </MenuContext>

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
    </CurrentMenuProvider>
  );
}
