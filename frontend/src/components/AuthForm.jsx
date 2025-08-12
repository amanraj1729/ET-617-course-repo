import React, { useState } from "react";
import "./AuthForm.css";
import "./AuthForm.css";
export default function AuthForm({ title, fields, onSubmit }) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {};

    fields.forEach(({ name }) => {
      if (!e.target[name].value.trim()) {
        newErrors[name] = `${name.replace("_", " ")} is required`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    if (!hasErrors) {
      onSubmit(e);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>{title}</h2>

        {fields.map(({ name, type, placeholder, options, onChange }) => (
          <div className="input-group" key={name}>
            {type === "select" ? (
              <select
                name={name}
                onChange={onChange}
                defaultValue=""
                className={errors[name] ? "error" : ""}
              >
                {options.map(({ value, label }) => (
                  <option key={value} value={value} disabled={value === ""}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete={name === "password" ? "current-password" : "off"}
                className={errors[name] ? "error" : ""}
              />
            )}

            {errors[name] && <small className="error-msg">{errors[name]}</small>}
          </div>
        ))}

        <button type="submit" className="btn-primary">
          {title}
        </button>
      </form>
    </div>
  );
}
