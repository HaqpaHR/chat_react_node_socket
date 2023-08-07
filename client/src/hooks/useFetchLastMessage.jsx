import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/ChatContext.jsx";
import {baseUrl, getRequest} from "../utils/service.js";

const UseFetchLastMessage = (chat) => {
    const {newMessage, notifications} = useContext(ChatContext);
    const [lastMessage, setLasMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if (response.error) {
                return console.log("Error getting messages...", response.error);
            }

            setLasMessage(response[response?.length - 1]);
        }

        getMessages();

    }, [newMessage, notifications]);
    console.log(lastMessage)
    return {lastMessage};
};

export default UseFetchLastMessage;
