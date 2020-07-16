import React from 'react';
import { BackHandler } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import LoginView from './views/LoginView';
import TopMenu from './components/TopMenu';

import { navigationRef } from './utils/navigation'

function Index(props) {
  const { user } = props;

  BackHandler.exitApp = () => {}

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
      <AppNavigator ref={navigationRef}/>
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
}))(Index);