import React from 'react';
import { BackHandler } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

import LoginView from './views/LoginView';
import TopMenu from './components/TopMenu';

import * as Notifications from './notifications/index';
import * as navigation from './utils/navigation';

import { showNotify } from './store/actions/notifications';

function Index(props) {
  const { user, dispatch } = props;

  BackHandler.exitApp = () => {}

  React.useEffect(() => {
    let cleanupFunction = false

    if (user.isAuth && props.notification.notify && navigation.isReadyRef.current) {
      dispatch(showNotify());
    }

    if (!cleanupFunction) {
      Notifications.register(dispatch);
      Notifications.addListener(dispatch);
    }

    return () => {
      cleanupFunction = true
    }
  }, [props.notification.notify, navigation.isReadyRef.current])

  if (!user.isAuth) {
    return (
      <MainView>
        <LoginView/>
      </MainView>
    )
  }

  return (
    <MainView>
      <TopMenu/>
      <AppNavigator/>
    </MainView>
  );
}

const MainView = styled.View`
  flex: 1;
  background-color: white;
  margin-top: 30px;
`;

export default connect((state) => ({
  user: state.user,
  notification: state.notification
}))(Index);