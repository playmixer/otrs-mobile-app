import { createSwitchNavigator } from 'react-navigation'

import TicketsView from '../views/TicketView/TicketsView'
import ArticleListView from '../views/TicketView/ArticleListView'

const TicketsNavigator = createSwitchNavigator({
  Tickets: {
    screen: TicketsView,
    navigationOptions: {
      title: "Открытые заявки",
    }
  },
  ArticleListr: {
    screen: ArticleListView,
    navigationOptions: {
      title: "Заметки",
    }
  },
})

export default TicketsNavigator;