import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { getTicketsByUser, getTicket } from '../../store/actions/ticket'

import TicketView from './Ticket'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Layout from '../../components/MainLayout'

function UserTicketsView({ user, ticket, navigation, dispatch }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const onShow = () => {
    dispatch(getTicketsByUser({ userID: user.model.id, basic: user.basic }))
  }

  React.useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) {
      onShow()
      setIsLoading(false)
    }

    return () => cleanupFunction = true;
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onShow()
    ticket.listByUser.items.map((id) => {
      dispatch(getTicket({ id: id, basic: user.basic }))
    })
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  if (isLoading) {
    return <Loader size="large"/>
  }

  return (
    <Layout
      title="Мои заявки"
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    >
      <TicketGroup>
        {ticket.listByUser.items?.sort((a, b)=> a < b).slice(0,ticket.listByUser.pageSize).map((id) => {
          return (
            <TicketView
              key={id}
              ticketId={id}
              navigation={navigation}
            />
          )
        })}
      </TicketGroup>
      {
        ticket.listByUser.items?.length > ticket.listByUser.pageSize && <Button
          onPress={() => {
            dispatch(setSizePageUserTickets(ticket.listByUser.pageSize + 5))
          }}
          title="Ещё..."
        />
      }
    </Layout>
  )
}

const TicketGroup = styled.View``;

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket
}))(UserTicketsView);