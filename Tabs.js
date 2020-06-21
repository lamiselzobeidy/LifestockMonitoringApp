import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CurrentPosture from './screens/CurrentPosturePage';
import DailyReport from './screens/DailyReportPage';



const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Current Posture" component={CurrentPosture} />
      <Tab.Screen name="Daily Report" component={DailyReport} />
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