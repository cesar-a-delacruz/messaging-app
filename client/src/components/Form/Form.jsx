import styles from "./Form.module.css";
import { useEffect, useRef, useState } from "react";
import FormField from "../FormField/FormField";
import compareObjects from "@/utils/js/compareObjects";
import removeEmptyFields from "@/utils/js/removeEmptyFields";

export default function Form({
  fieldsets,
  initialData,
  readOnly = false,
  submit = { text, handler, disable },
}) {
  const [data, setData] = useState(initialData);
  const [disableSubmit, setDisableSubmit] = useState(submit.disable || true);
  const form = useRef(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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
                readOnly={readOnly}
                key={field.id}
              />
            ))}
          </fieldset>
        ))}
      </div>
      <button
        type="submit"
        style={{
          display: readOnly ? "none" : "initial",
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
