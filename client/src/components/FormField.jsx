export default function FormField({ properties, value, changeHandler }) {
  return (
    <div className={`field ${properties.type}`}>
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
            value={value}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
          ></textarea>
        );
      case "file":
        return (
          <>
            <input
              type={properties.type}
              id={properties.id}
              onChange={(e) => {
                const img = document.getElementById(`${properties.id}Preview`);
                const file = e.currentTarget.files[0];
                img.src = file ? URL.createObjectURL(file) : null;
                img.style.display = file ? "block" : "none";
                changeHandler(e.currentTarget.id, e.currentTarget.files[0]);
              }}
              accept="image/*"
            />
            <img
              src={properties.value ? properties.value : null}
              style={{ display: properties.value ? "block" : "none" }}
              alt={`${properties.id} Preview`}
              id={`${properties.id}Preview`}
            />
          </>
        );
      default:
        return (
          <input
            type={properties.type}
            id={properties.id}
            value={value}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
          />
        );
    }
  }
}
