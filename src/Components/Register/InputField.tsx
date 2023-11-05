import React from "react";
 
interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  placeHolder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mandatory: boolean;
}
 
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  placeHolder,
  value,
  onChange,
  mandatory,
}) => {
  return (
    <div className="input-field">
      <label className="input-label" htmlFor={name}>
        {label} {mandatory && <span className="mandatory">*</span>}
      </label>
      <input
        className="input-area"
        type={type}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
   
    </div>
  );
};
 
export default InputField;