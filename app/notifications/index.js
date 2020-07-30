import React from 'react';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import { setNotify, setToken } from '../store/actions/notifications';

export const register = async (dispatch) => {
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

    const TOKEN = await Notifications.getExpoPushTokenAsync();
    dispatch(setToken(TOKEN));
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

const _handleNotification = (dispatch) => (notification) => {
  if (notification.origin === "selected") {
    dispatch(setNotify(notification))
  }
}

export const addListener = (dispatch) => {
  Notifications.addListener(_handleNotification(dispatch))
}
