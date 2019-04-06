import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../../screens/Home/tabs/Search/SearchScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';

export default createStackNavigator({
    SearchScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
})