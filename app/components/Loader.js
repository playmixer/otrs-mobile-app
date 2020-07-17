import React from 'react'
import styled from 'styled-components/native'

import * as appColors from '../modules/colors'

export default function Loader(props) {
  return (
    <LoaderComponent
      color={appColors.main}
      {...props}
    />
  )
} ;

const LoaderComponent = styled.ActivityIndicator`
  flex: 1;
  width: 100%;
`;