import { createStackNavigator } from 'react-navigation'
import ShopScreen from '../../screens/Home/tabs/Shop/ShopScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import EditChocolateScreen from '../../screens/EditChocolate/EditChocolateScreen';

export default createStackNavigator({
    ShopScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
    EditChocolateScreen
});