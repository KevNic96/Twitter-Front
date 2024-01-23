import React, {useRef, useEffect} from "react";
import { StyledMessage } from "./StyledMessage";
import { useAppSelector } from "../../../../redux/hooks";

interface MessageProps {
    content: string;
    createdAt: string;
    from: string;
    to: string;
    id: string;
}

const Message = ({content, createdAt, from, to} : MessageProps) =>{
    const user = useAppSelector((state) => state.user.user);
    const date = new Date(createdAt);

    const formattedDate = date.toLocaleString("es-ES",{
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView();
    }, []);

    return (
        <StyledMessage className={user.id === from ? "message-sent" : "message-receiver"}>
        <p className="message-content">{content}</p>
        <p className="message-date">{formattedDate.toString()}</p>
        <div ref={messagesEndRef}/>
        </StyledMessage>
    )
}

export default Message;