import styles from "./Profile.module.css";
import Form from "@/components/Form/Form";

export default function Profile({ initialData, edit = {}, options = [] }) {
  return (
    <div className={styles.profile}>
      <Form
        fieldsets={
          edit.isAllowed
            ? initialData
            : [
                {
                  fields: initialData[0].fields.map((field) => {
                    field.disabled = true;
                    return field;
                  }),
                },
              ]
        }
        submit={{ text: "Edit", handler: (data) => edit.handler(data) }}
      />
      <div className={styles.options}>
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
}
