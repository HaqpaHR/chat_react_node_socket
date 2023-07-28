import {useEffect, useState} from "react";
import {baseUrl, getRequest} from "../utils/service.js";


export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user?.id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

            if (response.error) {
                console.log(response.message)
                return setError(error)
            }

            setRecipientUser(response)
        }

        getUser();

    }, [])

    return {recipientUser}
}

export const convertDateFromMongo = (date) => {
    let separateDate = date.split('T');
    let dateDays = separateDate[0];
    let time = separateDate[1].split('.')[0];
    return {dateDays, time}
}
