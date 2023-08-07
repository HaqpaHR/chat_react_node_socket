import React, { useContext, useState } from "react";
import notification from "../assets/img/bell-fill.svg";
import { AuthContext } from "../context/AuthContext.jsx";
import ChatContext from "../context/ChatContext.jsx";
import {
  convertDateFromMongo,
  unreadNotificationsFunc,
} from "../utils/diffFunctions.js";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsIsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications, allUsers);

  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={notification} alt="notification" height="20px" />
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            {unreadNotifications?.length}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsIsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          {unreadNotifications?.length === 0 ? (
            <span className="notification">No notification yet...</span>
          ) : null}
          {unreadNotifications &&
            unreadNotifications.map((n, i) => {
              const { dateDays, time } = convertDateFromMongo(n.date);

              return (
                <div
                  key={i}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() => {
                    markNotificationAsRead(n, userChats, notifications);
                    setIsOpen(false);
                  }}
                >
                  <span>{`${n.senderName} sent you a message`}</span>
                  <span className="notification-time">{time}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Notification;
