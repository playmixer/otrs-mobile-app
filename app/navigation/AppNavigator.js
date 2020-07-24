import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator} from 'react-navigation-tabs'

import UserTicketsNavigator from './UserTicketsNavigator'
import TicketNavigator from './TicketsNavigator'

import SettingsView from '../views/SettingsView'

const AppNavigator = createBottomTabNavigator({
  UserTickets: {
    screen: UserTicketsNavigator,
    navigationOptions: {
      title: "Мои заявки",
    }
  },
  Tickets: {
    screen: TicketNavigator,
    navigationOptions: {
      title: "Открытые заявки",
    }
  },
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      title: "Настройки"
    }
  },
}, {
  initialRouteName: 'UserTickets',
  backBehavior: 'none',
  lasy: false,
})

export default createAppContainer(AppNavigator);