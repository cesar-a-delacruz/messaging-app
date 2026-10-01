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
  const { data, fieldset } = useContext(ProfileContext);

  return (
    <div className={styles.profile}>
      <Form
        fieldsets={[fieldset]}
        initialData={{ ...data, image: data.image || "/empty.webp" }}
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
