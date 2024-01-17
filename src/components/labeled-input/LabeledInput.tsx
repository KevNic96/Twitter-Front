import React, { ChangeEvent, useRef, useState } from "react";
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";


//Punto 6)
interface InputWithLabelProps {
  type?: "password" | "text";
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  value?:string;
  helperText?: string | boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({
  title,
  placeholder,
  required,
  error,
  onChange,
  type = "text",
  value,
  helperText
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (<>
    <StyledInputContainer
      className={`${error ? "error" : ""}`}
      onClick={handleClick}
    >
      <StyledInputTitle
        className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
      >
        {title}
      </StyledInputTitle>
      <StyledInputElement
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={error ? "error" : ""}
        value={value}
        ref={inputRef}
      />
    </StyledInputContainer>
    {helperText && <p style={{fontSize: '12px', color: 'red', margin: '0px'}}>{helperText}</p>}
    </>
  );
};

export default LabeledInput;
