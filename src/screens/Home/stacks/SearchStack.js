import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../tabs/Search/SearchScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';

export default createStackNavigator({
    SearchScreen,
    ScannerScreen
})