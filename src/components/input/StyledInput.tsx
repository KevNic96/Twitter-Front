import styled from "styled-components";
import "@fontsource/manrope";

interface InputProps{
    inputSize: InputSize;
    inputType: InputType;
}
export enum InputType{
    DISABLED = "DISABLED",
    OUTLINED = "OUTLINED",
    FULFILLED = "FULFILLED",
    GHOST = "GHOST",
    WHITE = "WHITE"
}

export enum InputSize{
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export const StyledInput = styled.input<InputProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    margin-bottom: 8px;
    width: ${(props) => {
        switch(props.inputSize){
            case InputSize.SMALL:
                return "100px";
            case InputSize.MEDIUM:
                return "150px";
            case InputSize.LARGE:
                return "200px";
            default:
                return "150px";
        }
    }}
    height: 33px;
    left: 16px;
    top: 16px;

    background: ${(props) => {
        switch (props.inputType){
            case "DISABLED":
                return props.theme.colors.light
            case "OUTLINED":
                return props.theme.colors.white;
            case "FULFILLED":
                return props.theme.colors.main;
            case "GHOST":
                return "transparent";
            case "WHITE":
                return props.theme.colors.white;
            default:
                return props.theme.colors.main;
        }
    }}
    border-radius: 4px;

    // Input
    font-family: ${(props)=> props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) =>
        props.inputType === "OUTLINED" || props.inputType === "GHOST"
            ? `1px solid ${props.theme.colors.black}`
            : "none"};

    color: ${(props) => {
        switch(props.inputType){
            case "WHITE" || "OUTLINED":
                return props.theme.colors.black
            case "GHOST":
                return props.theme.colors.main
            default:
                return props.theme.colors.white
        }
    }}

    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active{
        transform: scale(0.95);
    }

    &:focus{
        outline: none;
    }

`;

export default StyledInput;