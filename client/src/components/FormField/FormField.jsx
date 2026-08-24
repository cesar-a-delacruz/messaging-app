import styles from "./FormField.module.css";

export default function FormField({ properties, value, changeHandler }) {
  return (
    <div className={styles.field}>
      {properties.label && (
        <label htmlFor={properties.id}>{properties.label}:</label>
      )}
      {renderInput()}
    </div>
  );

  function renderInput() {
    switch (properties.type) {
      case "textarea":
        return (
          <textarea
            id={properties.id}
            value={value || ""}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
            placeholder={properties.placeholder || ""}
            disabled={properties.disabled}
          ></textarea>
        );
      case "file":
        return (
          <>
            <input
              style={{ display: "none" }}
              type={properties.type}
              id={properties.id}
              onChange={(e) => {
                const file = e.currentTarget.files[0];

                const container = document.getElementById(
                  properties.id + "Container",
                );
                container.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
                changeHandler(e.currentTarget.id, e.currentTarget.files[0]);
              }}
              accept="image/*"
              disabled={properties.disabled}
            />
            <div
              id={`${properties.id}Container`}
              style={{
                "--after-display": properties.disabled ? "none" : "initial",
                backgroundImage: value ? `url(${value})` : "none",
              }}
              onClick={() => {
                const input = document.getElementById(`${properties.id}`);
                input.click();
              }}
              tabIndex={0}
            ></div>
          </>
        );
      default:
        return (
          <input
            type={properties.type}
            id={properties.id}
            value={value || ""}
            placeholder={properties.placeholder || ""}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
            disabled={properties.disabled}
          />
        );
    }
  }
}
