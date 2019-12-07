import { createStackNavigator } from 'react-navigation';
import CartScreen from '../../screens/Home/tabs/Cart/CartScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import DeliveryMethodScreen from '../../screens/DeliveryMethod/DeliveryMethodScreen';
import ReviewOrderScreen from '../../screens/ReviewOrder/ReviewOrderScreen';

export default createStackNavigator({
    CartScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
    DeliveryMethodScreen,
    ReviewOrderScreen
});
