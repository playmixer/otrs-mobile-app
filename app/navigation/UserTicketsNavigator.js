import { createSwitchNavigator } from 'react-navigation'

import UserTicketsView from '../views/TicketView/UserTicketsView'
import ArticleListView from '../views/TicketView/ArticleListVIew'

const UserTicketsNavigator = createSwitchNavigator({
  UserTickets: {
    screen: UserTicketsView,
    navigationOptions: {
      title: "Мои заявки"
    }
  },
  ArticleListr: {
    screen: ArticleListView,
    navigationOptions: {
      title: "Заметки"
    }
  },
})

export default UserTicketsNavigator;