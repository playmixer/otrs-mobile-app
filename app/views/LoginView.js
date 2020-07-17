import React, { useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { userLogin, getAsyncStorage } from '../store/actions/user';

import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';

function LoginView(props) {
  const { dispatch, user } = props;
  const [username, useUsername] = useState('');
  const [password, usePassword] = useState('');
  const refPassword = React.createRef()

  const handleSignIn = () => {
    dispatch(userLogin({ username, password }));
  }

  React.useEffect(() => {
    let cleanupFunction = false

    if (!cleanupFunction) {
      dispatch(getAsyncStorage())
    }

    return () => cleanupFunction = true
  }, [])

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
          keyboardType="default"
          onChange={(e) => useUsername(e.nativeEvent.text)}
          onSubmitEditing={() => refPassword.current.focus()}
          value={username}
        />
        <Input
          secureTextEntry={true}
          placeholder="Пароль"
          textContentType="password"
          ref={refPassword}
          keyboardType="default"
          onChange={(e) => usePassword(e.nativeEvent.text)}
          onSubmitEditing={() => handleSignIn()}
          value={password}
        />
        {user.isAuthError && <Text color="red" style={{ marginBottom: 5}}>Логин или пароль неверны</Text>}
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