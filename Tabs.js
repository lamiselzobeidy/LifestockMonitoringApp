import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CurrentPosture from './screens/CurrentPosturePage';
import DailyReport from './screens/DailyReportPage';
import Dummy from './screens/dummy';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Octicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, FlatList, Header } from 'react-native';

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

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
    <MaterialBottomTabs.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: "#9a5def" }} >
      <MaterialBottomTabs.Screen options={{ tabBarIcon: ({ focused, color }) => ( <Octicons name="broadcast" size={25} color={color} /> ), tabBarLabel:"Posture" }} name="Current Posture" component={CurrentPosture}/>
      <MaterialBottomTabs.Screen options={{ tabBarIcon: ({ focused, color }) => ( <Octicons name="list-unordered" size={25} color={color} /> ), tabBarLabel:"Report"}} name="Daily Report"  component={DailyReport} />
    </MaterialBottomTabs.Navigator>
  );
}
export default function App() {
    return (
      <NavigationContainer> 
      <Stack.Navigator screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#9a5def' },
        headerTitleAlign:'center',
      }}>
      <Stack.Screen
        name="Life Stock Monitoring"
        children={MyTabs}
      />
    </Stack.Navigator>
      </NavigationContainer>
    );
  }

  