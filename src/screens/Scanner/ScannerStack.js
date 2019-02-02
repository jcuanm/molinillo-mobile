import { createStackNavigator } from 'react-navigation'
import AddChocolateScreen from '../AddChocolate/AddChocolateScreen';
import ScannerScreen from '../../Scanner/ScannerScreen';

export default createStackNavigator({
    ScannerScreen,
    AddChocolateScreen
});