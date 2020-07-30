import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import { subscribe, unSubscribe, checkSubsription } from '../firebase/actions'
import { sendPushNotification } from '../notifications/actions'

import Layout from '../components/MainLayout'
import Switch from '../components/Switch'
import Text from '../components/Text'
import Button from '../components/Button'

function SettingsView({ user, ticket, notification }) {
  const [isSendPush, setIsSendPush] = React.useState(false)

  const handleChangeSubscribe = () => {
    setIsSendPush(!isSendPush)

    if (!isSendPush) {
      return subscribe({ userID: user.model.id, userName: user.model.login, tickets: ticket.listByUser.items, token: notification.token })
    }

    if (isSendPush) {
      return unSubscribe({ userID: user.model.id })
    }
  }

  React.useEffect(() => {
    let cleanupFunction = false

    if (!cleanupFunction) {
      checkSubsription({ userID: user.model.id })
        .then(res => {
          if (res.toJSON()?.expoToken === notification.token) {
            setIsSendPush(true)
          } else {
            setIsSendPush(false)
          }
        })
    }

    return () => cleanupFunction = true
  }, [])

  return (
    <Layout title="Настройки">
      <Option>
        <Text>Получать Push уведомления</Text>
        <Switch
          onValueChange={handleChangeSubscribe}
          value={isSendPush}
        />
      </Option>
      {user.model.id == 2260 && <Button
        onPress={() => {
          sendPushNotification({
            token: notification.token,
            title: "test",
            message: "Test",
            data: { ticketID: 7296252 }
          })
        }}
        title="Send push"
      />}
    </Layout>
  )
}

const Option = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export default connect(({ user, ticket, notification }) => ({
  user: user,
  ticket: ticket,
  notification: notification,
}))(SettingsView)