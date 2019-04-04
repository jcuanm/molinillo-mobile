import { createStackNavigator } from 'react-navigation'
import ShopScreen from '../tabs/Shop/ShopScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';
import DetailScreen from '../../Detail/DetailScreen';
import AddChocolateScreen from '../../AddChocolate/AddChocolateScreen';

export default createStackNavigator({
    ShopScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
});