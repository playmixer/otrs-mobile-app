import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import Text from '../components/Text';

import { logout } from '../store/actions/user';

const img_logout = require('../assets/images/power.png');

const TopMenu = (props) => {
  const { user, dispatch } = props;

  const handleLogOut = () => {
    dispatch(logout());
  }

  return (
    <Nav>
      <Text small>{[user.model.firstName, user.model.lastName].join(' ')}</Text>
        <LogoutButton
            onPress={handleLogOut}
        >
          <Image
            source={img_logout}
          />
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
  padding-horizontal: 15px;
`;

const Image = styled.Image`
  height: 25px;
  width: 25px;
  margin-left: 10px;
`;

const LogoutButton = styled.TouchableOpacity`

`;

export default connect(({user}) => ({
  user: user,
}))(TopMenu);