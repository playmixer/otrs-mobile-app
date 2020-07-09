import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Text from '../../components/Text';
import Loader from '../../components/Loader';

import * as appColors from '../../modules/colors';

import * as ticketApi from '../../api_client/ticket';
import { systemTime } from '../../api_client/system';

function TicketView(props) {
  const { ticketId } = props;
  const [ticket, setTicket] = React.useState({})  
  const dateNow = React.useRef(new Date())

  const MscTimeToUTC = (date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 3, date.getMinutes(), date.getSeconds())
  }
  
  const TimeToUTC = (date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  }
  
  const dateRange = (time, sTime = dateNow.current) => {
    try {
      let nowDate = time.split("")
      nowDate[10] = 'T'
      nowDate = MscTimeToUTC(new Date(nowDate.join("")))
  
      const dateRange = TimeToUTC(sTime) - nowDate
      const days = Math.trunc(dateRange / 10000 / 360 / 24)
      const hours = Math.trunc((dateRange / 10000 / 360) % 24)
      const minuts = Math.trunc((dateRange / 1000 / 60 / 60 ))

      const result = (days ? days+ ' дн ' : '') +hours+ ' ч ' +(!days ? minuts+ ' мин' : '')
      return result
    } catch(e) {
      return ""
    }
  }
  
  const getTicket = async (id) => {
    const { user } = props;

    return await ticketApi.ticketGet({ id: id, basic: user.basic })
      .then((res) => {
        setTicket({
          id: res.data.Data[45],
          number: res.data.Data[133],
          title: res.data.Data[117],
          owner: res.data.Data[29],
          type: res.data.Data[69],
          service: res.data.Data[67],
          created: res.data.Data[35],
        })
      })
      .catch(() => {
        setError({...error, dataTickets: "Ошибка загрузки данных тикета"})
        setTicket({})
      })
  }

  React.useEffect(() => {
    let cleanupFunction = false

    if (!cleanupFunction) {
      dateNow.current = new Date()
      getTicket(ticketId)
    }


    return () => cleanupFunction = true
  }, [])

  if (!ticket.number) {
    return <Loader size={"large"}/>
  }

  return (
    <TicketMain activeOpacity={0.5}>
      <TicketHead>
        <Text small color={appColors.main}>{ticket.number}</Text>
        <Text small>{ticket.owner}</Text>
        <Text small>{ticket.created && dateRange(ticket.created)}</Text>
      </TicketHead>
      <Text small>{ticket.title}</Text>
      <Text small>{ticket.type}</Text>
      <Text small>{ticket.service}</Text> 
    </TicketMain>
  )
};


const TicketMain = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  margin-bottom: 5px;
  padding-bottom: 10px;
`;


const TicketHead = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export default connect(({ user }) => ({
  user: user,
}))(TicketView)