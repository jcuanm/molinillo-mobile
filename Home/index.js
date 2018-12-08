import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Search from './Search';
import Shop from './Shop';
import Profile from './Profile';

const HomeTabs = createMaterialBottomTabNavigator(
    {
        Shop: Shop,
        Search: Search,
        Profile: Profile,
    },
    {
        activeColor: 'rgba(255,255,255,1)',
        inactiveColor: 'rgba(255,255,255,.7)',
        barStyle: {
            backgroundColor: 'crimson'
        }
    }
);

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ HomeTabs }, { headerMode: "none" });