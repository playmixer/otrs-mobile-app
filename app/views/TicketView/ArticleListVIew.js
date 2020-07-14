import React from 'react'
import styled from 'styled-components/native'

import Layout from '../../components/MainLayout'
import Text from '../../components/Text'
import Button from '../../components/Button'

export default function ArticleListView({ navigation }) {
  const handleGoBack = () => {
    navigation.navigate(navigation.state.params.backView)
  }

  return (
    <Layout title="Заметки">
      <Text onPress={handleGoBack}>qwe{navigation.state.params.ticketID}</Text>
      <Button onPress={handleGoBack} title="back"/>
    </Layout>
  )
};