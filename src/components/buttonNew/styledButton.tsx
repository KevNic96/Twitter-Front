import styled from "styled-components";
import "@fontsource/manrope";

    interface ButtonProp{
        buttonType: ButtonTypeNew,
        buttonSize: ButtonSizeNew
    }

    export enum ButtonTypeNew{
        DISABLED = "DISABLED",
        OUTLINED = "OUTLINED",
        FULFILLED = "FULFILLED",
        GHOST = "GHOST",
        WHITE = "WHITE"
    }

    export enum ButtonSizeNew{
        SMALL = "SMALL",
        MEDIUM = "MEDIUM",
        LARGE = "LARGE"
    }

    export const StyledButton = styled.button<ButtonProp>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 8px;
    margin-bottom: 8px;
    width: ${(props) => {
        switch(props.buttonSize){
            case ButtonSizeNew.SMALL:
                return "100px"
            case ButtonSizeNew.MEDIUM:
                return "150px"
            case ButtonSizeNew.LARGE:
                return "200px"
            default:
                return "150px"
        }
    }};
    height: 33px;
    left: 16px;
    top: 16px;

    background: ${(props) => {
      switch (props.buttonType) {
        case "FULFILLED":
          return props.theme.colors.main;
        case "WHITE":
          return props.theme.colors.white;
        case "GHOST":
          return "transparent";
        case "OUTLINED":
          return props.theme.colors.main;
        case "DISABLED":
          return props.theme.colors.light;
        default:
          return props.theme.colors.main;
      }
    }};
    border-radius: 40px;

    /* Button */
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) =>
      props.buttonType === "OUTLINED" || props.buttonType === "GHOST"
        ? `1px solid ${props.theme.colors.outline}`
        : "none"};


    color: ${(props) => {
        switch(props.buttonType){
            case "WHITE":
                return props.theme.color.black;
            case "OUTLINED":
                return props.theme.color.black;
            case "GHOST":
                return props.theme.color.main;
            default:
                return props.theme.color.white;
        }
    }}
    
    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
        background: ${(props) => {
          switch (props.buttonType) {
            case ButtonTypeNew.OUTLINED:
              return props.theme.hover.outlined;
            case ButtonTypeNew.FULFILLED:
              return props.theme.hover.default;
            
          }
        }}
`;
export default StyledButton;