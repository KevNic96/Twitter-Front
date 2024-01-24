import React, {useEffect, useState} from "react";
import ContactList from "./components/contactList/contactList";
import Chat from "./components/chat/Chat";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/user";
import { useNavigate } from "react-router-dom";

interface Contact {
    name: string;
    username: string;
    id: string;
    profilePicture: string;
}

const ChatPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const service = useHttpRequestService();

    const handleSetUser = async() => {
        try{ 
            const user = await service.me();
            dispatch(setUser(user));
            console.log(user);
        } catch(e){
            navigate("/sign-in");
        }
    };


    useEffect(() => {
        handleSetUser().then();
    }, []);

    const [contact, setContact] = useState<Contact | null>(null);

    const handleContact = (contact: Contact) => {
        setContact(contact);
    };

    return (
        <>
            <ContactList handleContact={handleContact} />
            <Chat contact={contact}/>
        </>
    );
};

export default ChatPage;