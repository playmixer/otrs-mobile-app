import React, { useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { userLogin } from '../store/actions/user';

import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';

function LoginView(props) {
  const { dispatch, user } = props;
  const [username, useUsername] = useState('');
  const [password, usePassword] = useState('');

  const handleSignIn = () => {
    dispatch(userLogin({ username, password }));
  }

  return (
    <Container>
      <Form>
        <Text
          title
          center
        >Авторизация</Text>
        <Input
          placeholder="Логин"
          textContentType="username"
          onChange={(e) => useUsername(e.nativeEvent.text)}
          value={username}
        />
        <Input
          secureTextEntry={true}
          placeholder="Пароль"
          textContentType="password"
          onChange={(e) => usePassword(e.nativeEvent.text)}
          value={password}
        />
        {user.isAuthError && <Text error>Логин или пароль неверны</Text>}
        <Button
          title="Вход"
          onPress={handleSignIn}
        />
      </Form>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;  
`;

const Form = styled.View`
  max-width: 300px;
  width: 100%;
  justify-content: center;
  border: #ccc 0.5px solid;
  padding: 15px;
  border-radius: 2px;
`;

export default connect((state) => ({
  user: state.user,
}))(LoginView);