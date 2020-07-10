import React from 'react'
import styled from 'styled-components'

import Button from '../../components/Button'

import Ticket from './Ticket'

function TicketGroup({ ticketList }) {
  const [pageSize, setPageSize] = React.useState(10)

  return (
    <>
    <Group>
      {ticketList.sort((a, b)=> a < b).slice(0,pageSize).map((id, index) => {
        return (  
          <Ticket
            key={id}
            ticketId={id}
          />
        )
      })}
    </Group>
    {ticketList.length > pageSize && <Button
      onPress={() => setPageSize(pageSize + 5)}
      title="Ещё..."
    />}
  </>
  )
}


const Group = styled.View`
  margin-top: 15px;
`;

export default TicketGroup;