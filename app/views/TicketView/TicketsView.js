import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import Text from '../../components/Text';
import Loader from '../../components/Loader';
import Layout from '../../components/MainLayout'

import TicketGroup from './TicketGroup'

import * as queueApi from '../../api_client/queue';
import * as ticketApi from '../../api_client/ticket';

const TicketsView = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [dataTickets, setDataTickets] = React.useState([]);
  const [error, setError] = React.useState({
    queues: false,
    openedTickets: false,
    dataTickets: false,
  })
  // const [pageSize, setPageSize] = React.useState(10)

  const getQueuesOfUser = () => {
    const { user } = props;

    return queueApi.getQueuesOfUser({ userId: user.model.id, basic: user.basic })
    .then((res) => {
      return res.data.Data.filter((val, index) => {
        if (index % 2 === 0) {
          return val
        }
      })
    })
    .catch((err) => {
      setError({...error, queues: "Ошибка загрузки очередей"})
      return []
    })
  }
  
  const getOpenedTickets = (queueIDs) => {
    const { user } = props;

    return ticketApi.openedTickets({ queueIDs: queueIDs, basic: user.basic })
    .then((res) => {
      return res.data.Data;
    })
    .catch((err) => {
      setError({...error, openedTickets: "Ошибка загрузки списка тикетов"})
      return []
    })
  }


  const onShow = async () => {
    if (true) {
      const queueList = await getQueuesOfUser();
      const ticketList = await getOpenedTickets(queueList);
      setDataTickets(ticketList)
    }
    setIsLoading(false)
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
    await onShow()
    setIsRefreshing(false)
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
      {error.queues && <Text error>{error.queues}</Text>}
      {error.dataTickets && <Text error>{error.dataTickets}</Text>}
      {error.openedTickets && <Text error>{error.openedTickets}</Text>}
      <TicketGroup
        ticketList={dataTickets}
      />
    </Layout>
  )
}


const GroupTickets = styled.View`
  margin-top: 15px;
`;

export default connect(({ user }) => ({
  user: user
}))(TicketsView);