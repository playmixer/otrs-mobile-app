import React from 'react'
import styled from 'styled-components/native'

import * as appColors from '../modules/colors'

export default function Loader(props) {
  const { size, style } = props;
  return (
    <LoaderComponent
      color={appColors.main}
      size={size}
      style={style}
    />
  )
} ;

const LoaderComponent = styled.ActivityIndicator`
  flex: 1;
  width: 100%;
`;