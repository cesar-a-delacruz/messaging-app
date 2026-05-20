import { useState } from "react";

export default function Form({ fields, submit = { text, handler } }) {
  const [data, setData] = useState(
    fields.reduce((acc, curr) => {
      acc[curr.id] = curr.value;
      return acc;
    }, {}),
  );

  return (
    <form onSubmit={submitHandler}>
      {fields.map((field) => (
        <div className={`field ${field.type}`}>
          {field.label && <label htmlFor={field.id}>{field.label}:</label>}
          <input
            type={field.type}
            id={field.id}
            value={data[field.id]}
            onChange={(e) =>
              setData({
                ...data,
                [e.currentTarget.id]: e.currentTarget.value,
              })
            }
          />
        </div>
      ))}
      <button type="submit">{submit.text}</button>
    </form>
  );

  async function submitHandler(event) {
    event.preventDefault();
    submit.handler(data);
  }
}
