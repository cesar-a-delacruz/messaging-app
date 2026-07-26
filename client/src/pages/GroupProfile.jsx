import { useParams } from "react-router-dom";
import { useState } from "react";
import useGet from "@/hooks/useGet";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import Image from "@/components/Image";

export default function GroupProfile() {
  const id = useParams().id;
  const [group, setGroup] = useGet(`group/${id}`);
  const [edit, setEdit] = useState(false);

  if (!group.data)
    return <Loader text={!group.error ? "Getting group..." : group.error} />;

  return (
    <div className="page">
      <Image src={group.data.image} alt={`${group.data.name} picture`} />
      <h2
        contentEditable={`true`}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="name"
      >
        {group.data.name}
      </h2>
      <p
        contentEditable={`true`}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="info"
      >
        {group.data.info}
      </p>
      <button
        disabled={!edit}
        onClick={async () => await requestHandler.put(group.data, "group")}
      >
        Edit
      </button>
    </div>
  );

  function inputHandler(event) {
    const key = event.currentTarget.id;
    const value = event.currentTarget.innerHTML;

    setGroup((prev) => {
      prev.data[key] = value;
      return prev;
    });
    setEdit(true);
  }
}
