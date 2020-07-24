import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import { subscribe, unSubscribe, checkSubsription } from '../firebase/actions'
import { getToken } from '../notifications/index'

import Layout from '../components/MainLayout'
import Switch from '../components/Switch'
import Text from '../components/Text'

function SettingsView({ user, ticket }) {
  const [isSendPush, setIsSendPush] = React.useState(false)

  const handleChangeSubscribe = () => {
    setIsSendPush(!isSendPush)

    if (!isSendPush) {
      return subscribe({ userID: user.model.id, userName: user.model.login, tickets: ticket.listByUser.items})
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
          if (res.toJSON()?.expoToken === getToken()) {
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

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket,
}))(SettingsView)