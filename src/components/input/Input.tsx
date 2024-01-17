import React from "react";
import { InputSize, InputType, StyledInput } from "./StyledInput";

interface InputProps{
    inputSize: InputSize;
    inputType: InputType;
    value?: string;
    disabled?: boolean;
}

const Input = ({ value, inputSize, inputType, disabled}:InputProps)=>{
    return (
        <StyledInput
            inputSize={inputSize ? inputSize : InputSize.MEDIUM}
            inputType={disabled ? InputType.DISABLED : inputType}
            disabled = {inputType === "DISABLED" || (disabled ? disabled: false)}
            value = {value}
        />
    )
};

export default Input;