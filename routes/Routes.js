import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CurrentPosturePage from '../screens/CurrentPosturePage';
import DailyReportPage from '../screens/DailyReportPage';


const screens = {
    CurrentPosture: {
        screen: CurrentPosturePage
    },
    DailyReport: {
        screen: DailyReportPage
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);