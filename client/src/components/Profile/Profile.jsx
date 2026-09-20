import { useContext } from "react";
import styles from "./Profile.module.css";
import Form from "@/components/Form/Form";
import ProfileContext from "@/contexts/ProfileContext";

export default function Profile({
  readOnly = true,
  editHandler,
  submitText = "Edit",
  options = [],
}) {
  const context = useContext(ProfileContext);

  return (
    <div className={styles.profile}>
      <Form
        fieldsets={[context.fieldset]}
        initialData={context.data}
        readOnly={readOnly}
        submit={{
          text: submitText,
          handler: async (data) =>
            editHandler ? await editHandler(data) : null,
          disable: true,
        }}
      />
      <div className={styles.options}>
        {options.map(
          (option) =>
            !option.hide && (
              <button
                key={option.text}
                className={styles.option}
                onClick={() => option.handler()}
              >
                {option.icon && option.icon}
                {option.text}
              </button>
            ),
        )}
      </div>
    </div>
  );
}
