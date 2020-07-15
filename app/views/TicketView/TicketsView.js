import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import { getTickets, setSizePage } from '../../store/actions/ticket'

import Button from '../../components/Button'
import Layout from '../../components/MainLayout'
import Loader from '../../components/Loader'

import TicketView from './Ticket'

const TicketsView = ({ user, dispatch, ticket, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  
  const onShow = () => {
    dispatch(getTickets({ userID: user.model.id, basic: user.basic }))
  }

  React.useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) {
      onShow()
      setIsLoading(false)
    }

    return () => cleanupFunction = true
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onShow()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  if (isLoading) {
    return <Loader size="large"/>
  }

  return (
    <Layout
      title="Открытые заявки"
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    >
      <TicketGroup>
        {ticket.list.items?.sort((a, b)=> a < b).slice(0,ticket.list.pageSize).map((id) => {
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
        ticket.list.items?.length > ticket.list.pageSize && <Button
          onPress={() => {
            dispatch(setSizePage(ticket.list.pageSize + 5))
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
  ticket: ticket,
}))(TicketsView);