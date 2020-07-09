import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import LoginView from './views/LoginView';
import UserProfileView from './views/UserProfileView';
import TicketsView from './views/TicketsView';

import TopMenu from './components/TopMenu';

function Index(props) {
  const { user } = props;

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
      <TicketsView/>
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