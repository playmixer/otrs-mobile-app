import React from 'react'
import styled from 'styled-components/native'
import * as color from '../modules/colors'


const Switch = ({ value, onValueChange }) => {
  
  const Switch = styled.Switch``

  return <Switch
      trackColor={{ false: "#ccc", true: "#ccc" }}
      thumbColor={value ? color.main : "#ccc"}
      onValueChange={onValueChange}
      value={value}
    />
}

export default Switch;