import { useState } from "react";
import Image from "@/components/Image";

export default function Profile({ initialData, edit = {}, options = [] }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="profile">
      <Image src={data.image.value} alt={`${data.title.value} picture`} />
      <h2
        contentEditable={edit.isAllowed}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"title"}
      >
        {data.title.value}
      </h2>
      {data.subtitle && <span id={"subtitle"}>{data.subtitle.value}</span>}
      <p
        contentEditable={edit.isAllowed}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"content"}
      >
        {data.content.value}
      </p>
      {edit.isAllowed && (
        <button
          onClick={() => {
            const newData = {};
            Object.keys(data).forEach((key) => {
              newData[data[key].id] = data[key].value;
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

    setData((prev) => {
      prev[key].value = value;
      return { ...prev };
    });
  }
}
