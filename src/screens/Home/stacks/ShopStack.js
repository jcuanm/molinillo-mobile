import { createStackNavigator } from 'react-navigation'
import ShopScreen from '../tabs/Shop/ShopScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';

export default createStackNavigator({
    ShopScreen,
    ScannerScreen
});