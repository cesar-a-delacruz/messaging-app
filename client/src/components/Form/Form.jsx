import styles from "./Form.module.css";
import { useRef, useState } from "react";
import FormField from "../FormField/FormField";
import compareObjects from "@/utils/js/compareObjects";
import removeEmptyFields from "@/utils/js/removeEmptyFields";

export default function Form({
  fieldsets,
  initialData,
  submit = { text, handler },
}) {
  const [data, setData] = useState(initialData);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const form = useRef(null);

  return (
    <form onSubmit={submitHandler} ref={form}>
      <div className={styles.fieldsets}>
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
      </div>
      <button
        type="submit"
        style={{
          display: fieldsets[0].fields[0].disabled ? "none" : "initial",
        }}
        disabled={disableSubmit}
      >
        {submit.text}
      </button>
    </form>
  );

  async function changeHandler(id, value) {
    const newData = removeEmptyFields({
      ...data,
      [id]: value,
    });
    setData(newData);

    if (compareObjects(newData, initialData)) setDisableSubmit(true);
    else setDisableSubmit(false);
  }
  async function submitHandler(event) {
    event.preventDefault();
    submit.handler(data);
    form.current.reset();
  }
}
