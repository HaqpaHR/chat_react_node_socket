
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
    if (!date) return {dateDays: "", time: ''}
    let separateDate = date.split('T');
    let dateDays = separateDate[0];
    let time = separateDate[1].split('.')[0];
    return {dateDays, time}
}

export function truncateText(text){
    let shortText = text?.substring(0, 20);

    if (text?.length > 20) {
        shortText = shortText + '...';
    }
    console.log(shortText)
    return shortText;
}
