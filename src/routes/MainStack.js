import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabNavigator} from '../components';
import {
  ChatRoom,
  Login,
  MainChat,
  MainContact,
  MainProfile,
  NewChat,
  MainNotif,
  Register,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Chats"
      tabBar={props => <BottomTabNavigator {...props} />}>
      <Tab.Screen name="Contacts" component={MainContact} />
      <Tab.Screen name="Chats" component={MainChat} />
      <Tab.Screen name="Profile" component={MainProfile} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChatRoom">
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="NewChat" component={NewChat} />
      <Stack.Screen name="MainNotif" component={MainNotif} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
