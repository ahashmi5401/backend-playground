import React from "react";

const Input = ({ value, onChange, placeholder, type, field }) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange ? (e) => onChange(field, e) : undefined}
    />
  );
};

export default Input;
