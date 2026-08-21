import styles from "./Profile.module.css";
import Form from "@/components/Form/Form";

export default function Profile({ form, edit, options = [] }) {
  return (
    <div className={styles.profile}>
      <Form
        fieldsets={[
          edit.isAllowed
            ? form.fieldset
            : {
                fields: form.fieldset.fields.map((field) => ({
                  ...field,
                  disabled: true,
                })),
              },
        ]}
        initialData={form.data}
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
