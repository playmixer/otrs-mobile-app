import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TicketsView from '../views/TicketView/TicketsView';
import UserProfileView from '../views/UserProfileView';
import AgentTicketView from '../views/TicketView/AgentTicketView';

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