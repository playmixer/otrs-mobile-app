import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/MainLayout';
import Text from '../components/Text';

function UserProfileView({ user, refreshing, onRefresh}) {

  return (
    <Layout
      title="Профиль"
      // refreshing={false}
      // onRefresh={onRefresh}

    >
      <Text large>id: {user.model.id}</Text>
      <Text large>login: {user.model.login}</Text>
      <Text large>email: {user.model.email}</Text>
      <Text large>firstName: {user.model.firstName}</Text>
      <Text large>lastName: {user.model.lastName}</Text>
    </Layout>
  )
}

export default connect(({user}) => ({
  user: user
}))(UserProfileView);