import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import Constants from 'expo-constants';

let TOKEN = ''

export const register = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    TOKEN = await Notifications.getExpoPushTokenAsync();
    console.log(finalStatus, TOKEN);
  } else {
    alert('Must use physical device for Push Notifications');
  }
}

const _listen = (notification) => {
  console.log(notification)
}

export const addListener = () => {
  Notifications.addListener(_listen)
}

export const removeListener = () => {
  Notifications.removeListener(_listen)
}

