import React from "react";
// import './InputFields.scss'

interface InputFieldProps {
    label: string;

    type: string;

    name: string;

    value: string;
    placeholder : string;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
}) => {
    return (
        <div>
            <label className="label">{label}</label>

            <input className="input" placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;
