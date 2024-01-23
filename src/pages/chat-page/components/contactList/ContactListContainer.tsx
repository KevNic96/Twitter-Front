import styled from "styled-components";

export const StyledContactListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: 35%;
    height: 100%;
    border-right: 1px solid ${(props) => props.theme.colors.containerLine};

    h5 {
        color: var(--grayscale-black, #000);
        /* H5 */
        font-size: 20px;
        font-family: "Inter", sans-serif;
        font-weight: 900;
        line-height: 110%;
        letter-spacing: -0.1px;
        padding: 16px;
        margin-top: 0;
        margin-bottom: 0;
    }

    h4 {
        color: var(--grayscale-black, #000);
        /* Body */
        font-size: 16px;
        font-family: "Inter", sans-serif;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: -0.1px;
        padding: 16px;
        margin-top: 0;
        margin-bottom: 0;
    }

    UserDataBox {
        height: 200px;
    }

@media (max-width: 600px) {
    .tweet-box-container {
        display: none;
    }
}
`;