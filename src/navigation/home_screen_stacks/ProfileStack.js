import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../../screens/Home/tabs/Profile/ProfileScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import AboutScreen from '../../screens/About/AboutScreen';
import ContactScreen from '../../screens/Contact/ContactScreen';
import OrderHistoryScreen from '../../screens/OrderHistory/OrderHistoryScreen';


export default createStackNavigator({
    ProfileScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
    AboutScreen,
    ContactScreen,
    OrderHistoryScreen
});