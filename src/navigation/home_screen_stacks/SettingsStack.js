import { createStackNavigator } from 'react-navigation'
import SettingsScreen from '../../screens/Home/tabs/Settings/SettingsScreen';
import ScannerScreen from '../../screens/Scanner/ScannerScreen';
import DetailScreen from '../../screens/Detail/DetailScreen';
import AddChocolateScreen from '../../screens/AddChocolate/AddChocolateScreen';
import EditChocolateScreen from '../../screens/EditChocolate/EditChocolateScreen';

export default createStackNavigator({
    SettingsScreen,
    ScannerScreen,
    DetailScreen,
    AddChocolateScreen,
    EditChocolateScreen
});