import React from 'react'
import styled from 'styled-components/native'

import Layout from '../components/MainLayout'
import Switch from '../components/Switch'
import Text from '../components/Text'

function SettingsView(props) {
  const [isSendPush, setIsSendPush] = React.useState(false)

  return (
    <Layout title="Настройки">
      <Option>
        <Text>Получить Push уведомления</Text>
        <Switch
          onValueChange={() => {setIsSendPush(!isSendPush)}}
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

export default SettingsView;