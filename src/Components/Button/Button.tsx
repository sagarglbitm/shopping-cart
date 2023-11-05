import React from "react";
import "./Button.scss";

interface ButtonProps {
  label: string;
  className?: string;
  key?: string;
  onClick?: () => void;
  disabled?: any
}

const Button: React.FC<ButtonProps> = ({ key, label, className, onClick, disabled }) => {
  return (
    <button key={key} className={className} onClick={onClick} disabled={disabled} >
      {label}
    </button>
  );
};

export default Button;
