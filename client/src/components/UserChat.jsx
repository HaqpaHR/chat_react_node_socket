import React, { useContext } from "react";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient.jsx";
import { Stack } from "react-bootstrap";
import avatar from "../assets/img/avatar.svg";
import ChatContext from "../context/ChatContext.jsx";
import potentialChats from "./PotentialChats.jsx";
import {convertDateFromMongo, truncateText, unreadNotificationsFunc} from "../utils/diffFunctions.js";
import useFetchLastMessage from "../hooks/useFetchLastMessage.jsx";
import UseFetchLastMessage from "../hooks/useFetchLastMessage.jsx";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, allUsers, markThisUserNotificationAsRead } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications, allUsers);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );
  const {lastMessage} = useFetchLastMessage(chat);
  const {dateDays, time } = convertDateFromMongo(lastMessage?.createdAt);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications)
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="avatar" height="40px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">{lastMessage?.text && (<span>
            {truncateText(lastMessage?.text)}
          </span>)}</div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">{`${dateDays}   ${time}`}</div>
          <div
            className={
              thisUserNotifications.length > 0 ? "this-user-notifications" : ""
            }
          >
            {thisUserNotifications.length > 0
              ? thisUserNotifications.length
              : ""}
          </div>
          <span
            className={
              onlineUsers?.some((user) => user?.userId === recipientUser?._id)
                ? "user-online"
                : ""
            }
          ></span>
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
