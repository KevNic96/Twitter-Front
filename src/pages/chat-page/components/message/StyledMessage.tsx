import styled from "styled-components";

export const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  width: 100%;
  p {
    margin: 0;
    padding: 0;
  }
  .message-content {
    background-color: #f1f0f0;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
  }
  .message-date {
    font-size: 0.7rem;
    color: #c4c4c4;
  }
  &.message-sent {
    align-items: flex-end;
    .message-content {
      background-color: #00b87c;
      color: white;
      border-bottom-right-radius: 5px;
    }
  }
  &.message-received {
    align-items: flex-start;
    .message-content {
      background-color: rgb(74, 153, 233);
      color: white;
      border-top-left-radius: 5px;
    }
  }
`;