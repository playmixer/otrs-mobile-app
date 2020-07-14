import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import { getTickets } from '../../store/actions/ticket'

import Text from '../../components/Text'
import Loader from '../../components/Loader'
import Layout from '../../components/MainLayout'

import TicketGroup from './TicketGroup'

import * as queueApi from '../../api_client/queue'
import * as ticketApi from '../../api_client/ticket'
import { ticket } from '../../store/reducers'

const TicketsView = ({ user, dispatch, ticket, navigation }) => {
  // const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  // const [dataTickets, setDataTickets] = React.useState([])
  const [error, setError] = React.useState({
    queues: false,
    openedTickets: false,
    dataTickets: false,
  })
  
  const onShow = () => {
    if (!ticket.list.items.length || isRefreshing) {
      dispatch(getTickets({ userID: user.model.id, basic: user.basic }))
      // setIsLoading(false)
    }
  }

  React.useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) 
    {
      onShow()
    }

    return () => cleanupFunction = true
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onShow()
    setIsRefreshing(false)
  }

  // if (isLoading) {
  //   return <Loader size="large"/>
  // }

  return (
    <Layout
      title="Открытые заявки"
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    >
      {error.queues && <Text error>{error.queues}</Text>}
      {error.dataTickets && <Text error>{error.dataTickets}</Text>}
      {error.openedTickets && <Text error>{error.openedTickets}</Text>}
      <TicketGroup
        ticketList={ticket.list.items}
        navigation={navigation}
      />
    </Layout>
  )
}

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket,
}))(TicketsView);