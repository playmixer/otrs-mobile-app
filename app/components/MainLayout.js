import React from 'react'
import styled from 'styled-components/native'

import Text from './Text'

function Layout({ title, children, refreshing, onRefresh }) {

  return (
    <Container
      refreshing={refreshing || false}
      onRefresh={onRefresh}
    >
      <ContainerScroll>
        <Content>
          <Text title>{title}</Text>
          {children}
        </Content>
      </ContainerScroll>
    </Container>
  )
}


const Container = styled.RefreshControl`
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0 15px;
`;

const ContainerScroll = styled.ScrollView`
`;

export default Layout;