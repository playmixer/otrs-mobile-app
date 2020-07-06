import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import LoginView from './app/views/LoginView';
import UserProfileView from './app/views/UserProfileView';
import TicketsView from './app/views/TicketsView';

import NavMenu from './app/components/NavMenu';

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
      <NavMenu/>
      <TicketsView/>
    </MainView>
  );
}

const MainView = styled.View`
  flex: 1;
  background-color: white;
  /* padding-horizontal: 10px; */
  margin-top: 30px;
`;

export default connect((state) => ({
  user: state.user,
}))(Index);