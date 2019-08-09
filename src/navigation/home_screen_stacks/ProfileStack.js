import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../../screens/Home/tabs/Profile/ProfileScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import EditChocolateScreen from '../../screens/EditChocolate/EditChocolateScreen';
import MyChocolatesScreen from '../../screens/MyChocolates/MyChocolatesScreen';
import RatingsScreen from '../../screens/Ratings/RatingsScreen';
import AboutScreen from '../../screens/About/AboutScreen';

export default createStackNavigator({
    ProfileScreen,
    ScannerScreen,
    MyChocolatesScreen,
    DetailScreen,
    AddChocolateScreen,
    EditChocolateScreen,
    RatingsScreen,
    AboutScreen
});