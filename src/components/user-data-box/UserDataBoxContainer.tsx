import styled from "styled-components";

export const StyledUserDataBoxContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: content-fit;
    padding: 4px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    p {
        font-family: "Manrope", sans-serif;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
        letter-spacing: -0.15px;
        margin: 0;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 3px;
    }
`;