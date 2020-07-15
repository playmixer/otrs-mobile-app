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
          <Body>
            {children}
          </Body>
        </Content>
      </ContainerScroll>
    </Container>
  )
}


const Container = styled.RefreshControl`
  height: 100%;
`;

const Body = styled.View`
  margin-top: 15px;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0 15px;
`;

const ContainerScroll = styled.ScrollView`
`;

export default Layout;