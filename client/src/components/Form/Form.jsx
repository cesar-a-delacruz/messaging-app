import "./Form.module.css";
import { useRef, useState } from "react";
import FormField from "../FormField/FormField";

export default function Form({ fieldsets, submit = { text, handler } }) {
  const [data, setData] = useState(
    fieldsets
      .map((fieldset) =>
        fieldset.fields.reduce((acc, curr) => {
          acc[curr.id] = curr.value;
          return acc;
        }, {}),
      )
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  );
  const form = useRef(null);

  return (
    <form onSubmit={submitHandler} ref={form}>
      {fieldsets.map((fieldset) => (
        <fieldset key={fieldset.legend || ""}>
          {fieldset.legend && <legend>{fieldset.legend}</legend>}
          {fieldset.fields.map((field) => (
            <FormField
              properties={field}
              value={data[field.id]}
              changeHandler={changeHandler}
              key={field.id}
            />
          ))}
        </fieldset>
      ))}
      <button type="submit">{submit.text}</button>
    </form>
  );

  async function changeHandler(id, value) {
    setData({
      ...data,
      [id]: value,
    });
  }
  async function submitHandler(event) {
    event.preventDefault();
    submit.handler(data);
    form.current.reset();
  }
}
