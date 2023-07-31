import React, { useContext } from "react";
import ChatContext from "../context/ChatContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const PotentialChats = () => {
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="all-users">
        {potentialChats.map((u) => {
          return (
            <div
              className="single-user"
              key={u._id}
              onClick={() => createChat(user.id, u._id)}
            >
              {u.name}
              <span
                className={
                  onlineUsers?.some((user) => user?.userId === u?._id)
                    ? "user-online"
                    : ""
                }
              ></span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PotentialChats;
