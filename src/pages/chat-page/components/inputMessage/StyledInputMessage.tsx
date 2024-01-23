import styled from "styled-components";

export const StyledInputMessage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid ${(props) => props.theme.colors.containerLine};
    width: 100%;

    form{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    input {
        border-radius: 0.5rem;
        width: 100%;
        border: 1px solid ${(props) => props.theme.colors.containerLine};
        background-color: transparent;
        font-size: 1rem;
        padding: 0.7rem;
        color: ${(props)=> props.theme.colors.text};
        &::placeholder {
            color: ${(props) => props.theme.colors.text};
        }
        transition: all 0.3s ease-in-out;
        &: focus{
            outline: none;
            border: 1px solid rgb(74,153,233);
        }
    }

    button{
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        background-color: rgb(74,153, 233);
        border: none;
        color:white;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
            background-color: rgb(63, 138, 220);
        }
    }
}
`;