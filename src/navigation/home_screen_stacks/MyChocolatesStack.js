import { createStackNavigator } from 'react-navigation';
import MyChocolatesScreen from '../../screens/Home/tabs/MyChocolates/MyChocolatesScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';

export default createStackNavigator({
    MyChocolatesScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen
});
