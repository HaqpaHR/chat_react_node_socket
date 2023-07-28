import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service.js";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [isMessagesLoading, setMessagesIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetch users", response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?.id === u.id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        setIsLoading(true);
        setUserChatsError(null);
      }

      const response = await getRequest(`${baseUrl}/chats/${user?.id}`);

      setIsLoading(false);

      if (response.error) {
        return setUserChatsError(response);
      }
      setUserChats(response);
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setMessagesIsLoading(true);
      setMessagesError(null);

      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setMessagesIsLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const updateChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, [])

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
