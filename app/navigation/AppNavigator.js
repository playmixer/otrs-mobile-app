import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator} from 'react-navigation-tabs'

import UserTicketsNavigator from './UserTicketsNavigator'
import TicketNavigator from './TicketsNavigator'

import UserProfileView from '../views/UserProfileView'

const AppNavigator = createBottomTabNavigator({
  UserTickets: {
    screen: UserTicketsNavigator,
    navigationOptions: {
      title: "Мои заявки"
    }
  },
  Tickets: {
    screen: TicketNavigator,
    navigationOptions: {
      title: "Открытые заявки"
    }
  },
  UserProfile: {
    screen: UserProfileView,
    navigationOptions: {
      title: "Профиль"
    }
  },
}, {
  initialRouteName: 'UserTickets',
  lasy: true
})

export default createAppContainer(AppNavigator);