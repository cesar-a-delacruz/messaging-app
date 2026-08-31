import { useContext } from "react";
import styles from "./Profile.module.css";
import Form from "@/components/Form/Form";
import ProfileContext from "@/contexts/ProfileContext";

export default function Profile({
  readOnly = true,
  editHandler,
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
          text: "Edit",
          handler: async (data) =>
            editHandler ? await editHandler(data) : null,
        }}
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
