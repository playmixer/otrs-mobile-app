import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator} from 'react-navigation-tabs'

import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons'
import * as appColor from '../modules/colors'

import UserTicketsNavigator from './UserTicketsNavigator'
import TicketNavigator from './TicketsNavigator'

import SettingsView from '../views/SettingsView'

const AppNavigator = createBottomTabNavigator({
  UserTickets: {
    screen: UserTicketsNavigator,
    navigationOptions: {
      title: "Мои заявки",
      tabBarIcon: ({ tintColor }) => (<FontAwesome name="user" size={24} color={tintColor} />)
    }
  },
  Tickets: {
    screen: TicketNavigator,
    navigationOptions: {
      title: "Открытые заявки",
      tabBarIcon: ({ tintColor }) => (<FontAwesome name="list" size={24} color={tintColor} />)
    }
  },
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      title: "Настройки",
      tabBarIcon: ({ tintColor }) => (<MaterialIcons name="settings" size={24} color={tintColor} />)
    }
  },
}, {
  initialRouteName: 'UserTickets',
  backBehavior: 'none',
  lasy: false,
  tabBarOptions: {
    activeTintColor: appColor.main,
    inactiveTintColor: "black"
  }
})


export default createAppContainer(AppNavigator);