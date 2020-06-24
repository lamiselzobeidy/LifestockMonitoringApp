import * as React from 'react';
import CurrentPosture from './screens/CurrentPosturePage';
import DailyReport from './screens/ReportPage';
import Statistics from './screens/StatisticsPage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons } from "@expo/vector-icons";
import { useFonts, LobsterTwo_700Bold } from '@expo-google-fonts/lobster-two';

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <MaterialBottomTabs.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: "#9a5def" }} >
      <MaterialBottomTabs.Screen options={{ tabBarIcon: ({ focused, color }) => (<Octicons name="broadcast" size={25} color={color} />), tabBarLabel: "Posture" }} name="Current Posture" component={CurrentPosture} />
      <MaterialBottomTabs.Screen options={{ tabBarIcon: ({ focused, color }) => (<Octicons name="list-unordered" size={25} color={color} />), tabBarLabel: "Report" }} name="Daily Report" component={DailyReport} />
      <MaterialBottomTabs.Screen options={{ tabBarIcon: ({ focused, color }) => (<Octicons name="graph" size={25} color={color} />), tabBarLabel: "Statistics" }} name="Statistics" component={Statistics} />
    </MaterialBottomTabs.Navigator>
  );
}
export default function App() {

  let [fontsLoaded] = useFonts({
    LobsterTwo_700Bold
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#9a5def' },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'LobsterTwo_700Bold',
          fontSize: 30
        },
      }}>
        <Stack.Screen name="Livestock Monitor" children={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 