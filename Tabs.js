import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CurrentPosture from './screens/CurrentPosturePage';
import DailyReport from './screens/DailyReportPage';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Octicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

// const createHomeStack = () => (
//   <Stack.Navigator screenOptions={{
//     headerTintColor: 'white',
//     headerTitleAlign: 'center',
//     headerStyle: { backgroundColor: '#b504be'},
//     headerTitleStyle:{ fontWeight:'bold', fontSize:24}
//   }}
//   name="Life Stock Monitoring">
//   </Stack.Navigator>
// );


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ tabBarIcon: ({ focused, color }) => ( <Octicons name="package" size={25} color={color} /> ), }} screenOptions={{headerTitleAlign:'left'}} name="Current Posture" component={CurrentPosture}/>
      <Tab.Screen options={{ tabBarIcon: ({ focused, color }) => ( <Octicons name="package" size={25} color={color} /> ), }} name="Daily Report" component={DailyReport} />
    </Tab.Navigator>
  );
}
export default function App() {
    return (
      <NavigationContainer>
        
        <MyTabs />
      </NavigationContainer>
    );
  }