import React from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import * as apiTicket from '../../api_client/ticket'

import Layout from '../../components/MainLayout'
import Text from '../../components/Text'
import Loader from '../../components/Loader'

import * as dateFormat from '../../formatters/date'


function ArticleListView({ navigation, ticket, user, route }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [articleList, setArticleList] = React.useState({
    items: [],
    viewItems: {},
    chosedID: null,
  })

  const handleGoBack = () => {
    navigation.navigate('BottomNavigator')
  }

  const getArticleData = () => {
    apiTicket.getArticlesByTicket({ ticketID: route.params.ticketID, basic: user.basic })
      .then(res => {
        let views = {}
        let items = []
        res.data.Data.map((obj) => {
          items.push(obj.ArticleID)
          views = {
            ...views,
            [obj.ArticleID]: {
              from: obj.FromRealname,
              to: obj.ToRealname,
              cc: obj.CcRealname,
              body: obj.Body,
              subject: obj.Subject,
              created: obj.Created,

            }
          }
        })
        setArticleList({ items: items, viewItems: {...views}})
        setIsLoading(false)
      })
  }

  const formattingSubject = (subject) => {
    if (subject.indexOf("Ticket#") + 1) {
      return subject.split(" ").slice(1).join(" ")
    }
    return subject
  }

  const chooseArticle = (id) => {
    setArticleList({
      ...articleList,
      chosedID: articleList.chosedID === id ? null : id,
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)
    getArticleData()
  }

  React.useEffect(() => {
    let cleanupFunction = false

    if (!cleanupFunction) {
      BackHandler.addEventListener("hardwareBackPress", handleGoBack);

      getArticleData()
    }

    return () => {
      cleanupFunction = true
      BackHandler.removeEventListener("hardwareBackPress", handleGoBack);
    }
  }, [])

  if (isLoading) {
    return <Loader size="large"/>
  }

  return (
    <Layout
      title={`Ticket# ${ticket.viewItems[route.params.ticketID].number}`}
      onRefresh={handleRefresh}
    >
      <ArticleGroup>
      {
        articleList.items.map((id, index) => {
          const article = articleList.viewItems[id]
          return (
            <Article
              activeOpacity={0.7}
              key={index}
              onPress={() => {
                chooseArticle(id)
              }}
            >
              <ArticleHead>
                <ArticleIndex>
                  <Text>{index + 1}</Text>  
                </ArticleIndex>
                <ArticleTitle>
                  <Text>Отправил: {article.from}</Text>
                  <Text>Создан: {dateFormat.toString(article.created)}</Text>
                  <Text>Тема: {formattingSubject(article.subject)}</Text>
                </ArticleTitle>
              </ArticleHead>
              {
                articleList.chosedID === id && <ArticleBody>
                  <BodyTitle>
                    <Text>Отправитель: {article.from}</Text>
                    {article.to && <Text>Получатель: {article.to}</Text>}
                    {article.cc && <Text>Копия: {article.cc}</Text>}
                  </BodyTitle>
                  <BodyContainer>
                    <Text>{article.body}</Text>
                  </BodyContainer>
                </ArticleBody>
              }
            </Article>
          )
        })
      }
      </ArticleGroup>
    </Layout>
  )
};

const BodyTitle = styled.View`
  padding: 5px 0 5px 15px;
  border-top-width: 0.5px;
  border-top-color: #ccc;
  border-left-width: 0.5px;
  border-left-color: #ccc;
  border-top-left-radius: 5px;
`

const BodyContainer = styled.View`
  padding: 5px 10px 15px 15px;
  border-top-width: 0.5px;
  border-top-color: #ccc;
  border-left-width: 0.5px;
  border-left-color: #ccc;
`

const ArticleGroup = styled.View`
`

const Article = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 5px;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
`

const ArticleHead = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 5px;
`

const ArticleIndex = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: flex-start;
`

const ArticleTitle = styled.View`
  flex: 6;
`

const ArticleBody = styled.View`
  flex: 1;
  margin-top: 5px;
`

export default connect(({ user, ticket }) => ({
  user: user,
  ticket: ticket
}))(ArticleListView)