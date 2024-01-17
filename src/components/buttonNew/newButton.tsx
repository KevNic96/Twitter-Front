import React, {MouseEventHandler} from "react";
import { ButtonTypeNew, ButtonSizeNew, StyledButton } from "./styledButton";

interface ButtonProp {
    text: string;
    buttonSize: ButtonSizeNew;
    buttonType: ButtonTypeNew;
    onClick?: MouseEventHandler;
    disabled?: boolean;
  }

  const Button = ({ text, buttonSize, buttonType, onClick, disabled }: ButtonProp) => {
    return (
      <StyledButton
        buttonSize={buttonSize ? buttonSize : ButtonSizeNew.MEDIUM}
        buttonType={disabled ? ButtonTypeNew.DISABLED : buttonType}
        disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
        onClick={onClick}
      >
        {text}
      </StyledButton>
    );
  };
  
  export default Button;
  