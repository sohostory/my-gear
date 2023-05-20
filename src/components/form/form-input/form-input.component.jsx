import "./form-input.styles.scss";

const FormInput = ({ label, defaultValue, ...otherProps }) => {
  if (defaultValue) {
    return (
      <div className="group">
        <input className="form-input" value={defaultValue} {...otherProps} />
        {label && (
          <label
            className={`${otherProps.value ? "shrink" : ""} form-input-label`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${otherProps.value ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
