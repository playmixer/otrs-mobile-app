import React from 'react';
import styled from 'styled-components/native';

import * as appColors from '../modules/colors';

function Button(props) {
  const { title, onPress } = props;

  const Button = styled.TouchableOpacity`
    border-radius: 2px;
    background-color: ${appColors.main};
    height: 35px;
  `;

  const Text = styled.Text`
    padding: 5px 5px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  `;

  return (
    <Button
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Button>
  )
}

export default Button;