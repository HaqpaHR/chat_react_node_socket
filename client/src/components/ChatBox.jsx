import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import {
  convertDateFromMongo,
  useFetchRecipientUser,
} from "../hooks/useFetchRecipient.jsx";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import SendIcon from "../assets/img/send.svg";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { messages, currentChat, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  console.log(user);

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );
  }

  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chat...</p>
    );
  }

  convertDateFromMongo("2023-07-27T17:37:35.726Z");

  return (
    <Stack className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack className="messages mt-2" gap={3}>
        {messages &&
          messages.map((message) => {
            let { dateDays, time } = convertDateFromMongo(message.createdAt);
            return (
              <Stack
                key={message._id}
                className={
                  message?.senderId === user?.id
                    ? "message align-self-start flex-grow-0"
                    : "message self align-self-end flex-grow-0"
                }
              >

                <span>{message.text}</span>
                <span className="message-footer">{dateDays + " " + time}</span>
              </Stack>
            );
          })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          cleanOnEnter
          placeholder="Type a message"
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          onEnter={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
        />
          <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
              <img src={SendIcon}/>
          </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
