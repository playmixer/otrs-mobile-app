import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Text from '../components/Text';

function UserProfileView(props) {
  const { model } = props.user;

  return (
    <Container>
      <Text large>id: {model.id}</Text>
      <Text large>login: {model.login}</Text>
      <Text large>email: {model.email}</Text>
      <Text large>firstName: {model.firstName}</Text>
      <Text large>lastName: {model.lastName}</Text>
    </Container>
  )
}

export default connect(({user}) => ({
  user: user
}))(UserProfileView);