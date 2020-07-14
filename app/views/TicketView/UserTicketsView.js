import React from 'react'
import { connect } from 'react-redux'

import { getTicketsByUser } from '../../store/actions/ticket'

import Loader from '../../components/Loader'
import Layout from '../../components/MainLayout'

import TicketGroup from './TicketGroup'

function UserTicketsView({ user, ticket, navigation, dispatch }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const onShow = async () => {
    if (!ticket.listByUser?.items.length || isRefreshing) {
      dispatch(getTicketsByUser({ userID: user.model.id, basic: user.basic }))
    }
  }

  React.useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) {
      onShow();
      setIsLoading(false)
    }

    return () => cleanupFunction = true;
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onShow()
    setIsRefreshing(false)
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
      <TicketGroup
        ticketList={ticket.listByUser.items}
        navigation={navigation}
      />
    </Layout>
  )
}

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket
}))(UserTicketsView);