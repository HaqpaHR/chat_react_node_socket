import React from 'react';
import {useFetchRecipientUser} from "../hooks/useFetchRecipient.jsx";
import {Stack} from "react-bootstrap";
import avatar from '../assets/img/avatar.svg';

const UserChat = ({chat, user}) => {
    const {recipientUser} = useFetchRecipientUser(chat, user);

    return (
       <Stack
       direction="horizontal"
       gap={3}
       className="user-card align-items-center p-2 justify-content-between"
       role="button"
       >
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} alt="avatar" height="40px"/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text message</div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12/12/1212</div>
                <div className="this-user-notifications">2</div>
                <span className="user-online"></span>
            </div>
        </div>
       </Stack>
    );
};

export default UserChat;