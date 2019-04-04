import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../tabs/Profile/ProfileScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';
import MyChocolatesScreen from '../../MyChocolates/MyChocolatesScreen';
import RatingsScreen from '../../Ratings/RatingsScreen';
import WishlistScreen from '../../Wishlist/WishlistScreen';
import DetailScreen from '../../Detail/DetailScreen';
import AddChocolateScreen from '../../AddChocolate/AddChocolateScreen';

export default createStackNavigator({
    ProfileScreen,
    ScannerScreen,
    MyChocolatesScreen,
    DetailScreen,
    AddChocolateScreen,
    RatingsScreen,
    WishlistScreen
});