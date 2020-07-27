import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';

import Text from '../components/Text';

import { logout } from '../store/actions/user';

const TopMenu = (props) => {
  const { user, dispatch } = props;

  const handleLogOut = () => {
    dispatch(logout());
  }

  return (
    <Nav>
      <Text>{[user.model.firstName, user.model.lastName].join(' ')}</Text>
        <LogoutButton
            onPress={handleLogOut}
        >
          <Foundation name="power" size={24} color="black" />
        </LogoutButton>
    </Nav>
  )
}

const Nav = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
  padding: 0 15px;
`;

const Image = styled.Image`
  height: 25px;
  width: 25px;
  margin-left: 10px;
`;

const LogoutButton = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 2px 5px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #ccc;
`;

export default connect(({user}) => ({
  user: user,
}))(TopMenu);