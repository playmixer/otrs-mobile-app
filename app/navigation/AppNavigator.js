import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import TicketsView from '../views/TicketsView';
import UserProfileView from '../views/UserProfileView';
import AgentTicketView from '../views/AgentTicketView';

const AppNavigator = createBottomTabNavigator({
  AgentTickets: {
    screen: AgentTicketView,
    navigationOptions: {
      title: "Мои заявки"
    }
  },
  Tickets: {
    screen: TicketsView,
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
  initialRouteName: 'AgentTickets',
})

export default createAppContainer(AppNavigator);