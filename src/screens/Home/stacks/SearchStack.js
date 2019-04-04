import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../tabs/Search/SearchScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';
import DetailScreen from '../../Detail/DetailScreen';
import AddChocolateScreen from '../../AddChocolate/AddChocolateScreen';

export default createStackNavigator({
    SearchScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
})