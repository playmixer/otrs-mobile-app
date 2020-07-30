import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import UserTicketsView from '../views/TicketView/UserTicketsView';
import TicketsView from '../views/TicketView/TicketsView';
import SettingsView from '../views/SettingsView';
import ArticleListView from '../views/TicketView/ArticleListView';

import { navigationRef, isReadyRef } from '../utils/navigation';

import * as appColor from '../modules/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      backBehavior={'none'}
      tabBarOptions={{
        activeTintColor: appColor.main,
        inactiveTintColor: "black"
      }}
    >
      <Tab.Screen
        name="Мои заявки"
        component={UserTicketsView}
        options={{
          tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color={color} />)
        }}
      />
      <Tab.Screen
        name="Открытые заявки"
        component={TicketsView}
        options={{
          tabBarIcon: ({ color }) => (<FontAwesome name="list" size={24} color={color} />)
        }}
      />
      <Tab.Screen
        name="Настройки"
        component={SettingsView}
        options={{
          tabBarIcon: ({ color }) => (<MaterialIcons name="settings" size={24} color={color} />)
        }}
      />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  },[])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {isReadyRef.current = true}}
    >
      <Stack.Navigator>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator}
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen name="ArticleListView" component={ArticleListView}
          options={{
            headerShown:false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>)
}

export default AppNavigator;