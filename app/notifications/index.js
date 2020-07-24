import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import Constants from 'expo-constants';
import * as navigation from '../utils/navigation'

let TOKEN = ''

export const getToken = () => {
  return TOKEN
}

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
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
}

const _listen = (notification) => {
  if (notification.origin === "selected") {
    navigation.navigate("ArticleListr", {
      backView: navigation.state.routeName,
      ticketID: notification.data.ticketID
    })
  }
}

export const addListener = () => {
  Notifications.addListener(_listen)
}

export const removeListener = () => {
  Notifications.removeListener(_listen)
}

