import { useState } from "react";
import Image from "@/components/Image";

export default function Profile({ initialData, edit = {}, options = [] }) {
  const [profile, setProfile] = useState(initialData);

  return (
    <div className="profile">
      <Image src={profile.image.value} alt={`${profile.title.value} picture`} />
      <h2
        contentEditable={edit.isAllowed}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"title"}
      >
        {profile.title.value}
      </h2>
      {profile.subtitle && (
        <span id={"subtitle"}>{profile.subtitle.value}</span>
      )}
      <p
        contentEditable={edit.isAllowed}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"content"}
      >
        {profile.content.value}
      </p>
      {edit.isAllowed && (
        <button
          onClick={() => {
            const newData = {};
            Object.keys(profile).forEach((key) => {
              newData[profile[key].id] = profile[key].value;
            });
            edit.handler(newData);
          }}
        >
          Edit
        </button>
      )}
      <div className="options">
        {options.map(
          (option) =>
            !option.hide && (
              <button key={option.text} onClick={() => option.handler()}>
                {option.text}
              </button>
            ),
        )}
      </div>
    </div>
  );

  function inputHandler(event) {
    const key = event.currentTarget.id;
    const value = event.currentTarget.innerHTML;

    setProfile((prev) => {
      prev[key].value = value;
      return { ...prev };
    });
  }
}
