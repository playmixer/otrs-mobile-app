import { getToken } from './index'

export const sendPushNotification = async (notification) => {
  const token = notification.token;
  const message = {
    to: token,
    sound: 'default',
    title: notification.title,
    body: notification.message,
    data: {...notification.data},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
