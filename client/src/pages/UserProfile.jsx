import { useParams } from "react-router-dom";
import { useState } from "react";
import useGet from "@/hooks/useGet";
import sessionHandler from "@/handlers/sessionHandler";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import Image from "@/components/Image";

export default function UserProfile() {
  const id = useParams().id;
  const [user, setUser] = useGet(`user/${id ? id : sessionHandler.user().id}`);
  const [edit, setEdit] = useState(false);
  const isLoggedUserProfile =
    user.data && user.data.id === sessionHandler.user().id;

  if (!user.data)
    return <Loader text={!user.error ? "Getting user..." : user.error} />;

  return (
    <div className="page">
      <Image src={user.data.image} alt={`${user.data.fullname} picture`} />
      <h2
        contentEditable={isLoggedUserProfile}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="fullname"
      >
        {user.data.fullname}
      </h2>
      <span
        contentEditable={isLoggedUserProfile}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="username"
      >
        {user.data.username}
      </span>
      <p
        contentEditable={isLoggedUserProfile}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="bio"
      >
        {user.data.bio}
      </p>
      {isLoggedUserProfile && (
        <button
          disabled={!edit}
          onClick={async () => await requestHandler.put(user.data, "user")}
        >
          Edit
        </button>
      )}
    </div>
  );

  function inputHandler(event) {
    const key = event.currentTarget.id;
    const value = event.currentTarget.innerHTML;

    setUser((prev) => {
      prev.data[key] = value;
      return prev;
    });
    setEdit(true);
  }
}
