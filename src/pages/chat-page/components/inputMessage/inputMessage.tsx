import React, {useState} from "react";
import { StyledInputMessage } from "./StyledInputMessage";

interface inputMessageProps {
    handleSendMessage: (message: string) => void;
}

const InputMessage = ({handleSendMessage} : inputMessageProps) => {
    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        handleSendMessage(message);
        setMessage("");
    };

    return (
        <StyledInputMessage>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type="submit" disabled={!message}>Send</button>
            </form>
        </StyledInputMessage>
    )
}

export default InputMessage;