import { createStackNavigator } from 'react-navigation';
import OrdersScreen from '../../screens/Home/tabs/Orders/OrdersScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import DeliveryMethodScreen from '../../screens/DeliveryMethod/DeliveryMethodScreen';
import ReviewOrderScreen from '../../screens/ReviewOrder/ReviewOrderScreen';
import PaymentScreen from '../../screens/Payment/PaymentScreen';

export default createStackNavigator({
    OrdersScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
    DeliveryMethodScreen,
    ReviewOrderScreen,
    PaymentScreen
});