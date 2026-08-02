import { useState } from "react";
import Image from "@/components/Image";

export default function Profile({ initialData, contentEditable, editHandler }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="page">
      <Image src={data.image.value} alt={`${data.title.value} picture`} />
      <h2
        contentEditable={contentEditable}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"title"}
      >
        {data.title.value}
      </h2>
      {data.subtitle && (
        <span
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
          onInput={inputHandler}
          id={"subtitle"}
        >
          {data.subtitle.value}
        </span>
      )}
      <p
        contentEditable={contentEditable}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id={"content"}
      >
        {data.content.value}
      </p>
      {contentEditable && (
        <button
          onClick={() => {
            const newData = {};
            Object.keys(data).forEach((key) => {
              newData[data[key].id] = data[key].value;
            });
            editHandler(newData);
          }}
        >
          Edit
        </button>
      )}
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
