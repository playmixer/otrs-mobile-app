import React from 'react'
import { connect } from 'react-redux'

import * as ticketApi from '../../api_client/ticket';

import Text from '../../components/Text';
import Loader from '../../components/Loader';
import Layout from '../../components/MainLayout';

import TicketGroup from './TicketGroup'

function AgentTicketView(props) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [tickets, setTickets] = React.useState([])
  const [error, setError] = React.useState(false)

  const onShow = async () => {
    const { user } = props;
    await ticketApi.getTicketByOwned({ userID: user.model.id, basic: user.basic })
      .then((res) => {
        setTickets(res.data.Data)
        setError(false)
      })
      .catch((err) => {
        setError(true)
      })
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
      {error.current && <Text large color="red">Error</Text>}
      <TicketGroup
        ticketList={tickets}
      />
    </Layout>
  )
}

export default connect(({ user }) => ({
  user: user
}))(AgentTicketView);