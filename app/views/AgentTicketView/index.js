import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'


import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

function AgentTicketView(props) {

  return (
    <Container>

    </Container>
  )
}



export default connect(({ user }) => ({
  user: user
}))(AgentTicketView);