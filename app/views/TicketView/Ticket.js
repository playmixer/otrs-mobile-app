import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Text from '../../components/Text';
import Loader from '../../components/Loader';

import { getTicket } from '../../store/actions/ticket/';

import { navigate } from '../../utils/navigation';

import * as appColors from '../../modules/colors';

function TicketView({ user, ticketId, ticket, dispatch }) {
  const dateNow = React.useRef(new Date())
  const [error, setError] = React.useState({dataTickets: false})

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
  
  React.useEffect(() => {
    let cleanupFunction = false

    if (!cleanupFunction) {
      dateNow.current = new Date()
    }

    return () => cleanupFunction = true
  }, [])

  const ticketItem = ticket.viewItems[ticketId]

  if (!ticket.viewItems[ticketId]?.id) {
    dispatch(getTicket({ id: ticketId, basic: user.basic }))
    return <Loader size={"large"} style={{ minHeight: 80 }}/>
  }

  return (
    <TicketMain
      activeOpacity={0.5}
      onPress={()=>{
        navigate('ArticleListView', {
          ticketID: ticketItem.id
        })
      }}
    >
      <TicketHead>
        <Text small color={appColors.main}>{ticketItem.number}</Text>
        <Text small>{ticketItem.owner}</Text>
        <Text small>{ticketItem.created && dateRange(ticketItem.created)}</Text>
      </TicketHead>
      <Text small>{ticketItem.title}</Text>
      <Text small>{ticketItem.type}</Text>
      <Text small>{ticketItem.service}</Text>
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

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket,
}))(TicketView)
