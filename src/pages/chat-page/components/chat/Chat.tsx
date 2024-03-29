import React, { useEffect, useState, useRef } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { StyledChatContainer } from "./ChatContainer";
import MessageContainer from "../message/messageContainer";
import InputMessage from "../inputMessage/inputMessage";
import io, { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";

interface Contact {
  name: string;
  username: string;
  id: string;
  profilePicture: string;
}

interface Message {
  content: string;
  createdAt: string;
  from: string;
  to: string;
  id: string;
}

interface ChatProps {
  contact: Contact | null;
}

const Chat = ({ contact }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const service = useHttpRequestService();
  const t = useTranslation().t;
  const token = localStorage.getItem("token")?.split(" ")[1];
  // const socketRef = useRef<Socket | null>(null);
  const socket = io('http://localhost:8080',{
    auth: {
      token: token,
    }
  })
  const [loading, setLoading] = useState<boolean>(true);

  const handleMessages = async () => {
    try {
      if (!contact) return console.log("No contact");
      const data = await service.getChat(contact.id);
      setMessages(data);
    } catch (e) {
      console.log(e);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Componente Chat montado");
    console.log("Token: ", token);
    // socketRef.current = io(`http://localhost:8080?token=${token}`);
    // socketRef.current = io(`http://localhost:8080?token=${token}`, { transports: ['websocket'] });

    if (contact) {
      console.log("Obteniendo mensajes");
      handleMessages().then();

      socket.on("message", (message) => {
        console.log("Mensaje recibido: ", message);
        // if (!messages.includes(message)) {
          setMessages((prevMessages) => [...prevMessages, message]);
        // }
      });
    }

    return () => {
      console.log("Desmontando componente chat");
      socket.disconnect();
    };
  }, [contact, socket, token]);

  const handleSubmit = (content: string) => {
      if (socket.active) {
        socket.emit("message", { to: contact!.id, content });
      }
  };

  return (
    <StyledChatContainer>
      
      {<MessageContainer messages={messages} contact={contact} loading={loading}/>}
      {!loading && contact && <InputMessage handleSendMessage={handleSubmit} />}
    </StyledChatContainer>
  );
};

export default Chat;