import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../../screens/Home/tabs/Profile/ProfileScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import MyChocolatesScreen from '../../screens/MyChocolates/MyChocolatesScreen';
import AboutScreen from '../../screens/About/AboutScreen';
import ContactScreen from '../../screens/Contact/ContactScreen';

export default createStackNavigator({
    ProfileScreen,
    ScannerScreen,
    MyChocolatesScreen,
    DetailScreen,
    AddChocolateScreen,
    AboutScreen,
    ContactScreen
});