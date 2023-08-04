
export const unreadNotificationsFunc = (notifications, allUsers) => {
    let mNotifications = notifications.map((n) => {
        const sender = allUsers.find((user) => user._id === n.senderId)
        return {
            ...n,
            senderName: sender?.name,
        }
    })
    return mNotifications.filter((n) => n.isRead === false)
}

export const convertDateFromMongo = (date) => {
    let separateDate = date.split('T');
    let dateDays = separateDate[0];
    let time = separateDate[1].split('.')[0];
    return {dateDays, time}
}
