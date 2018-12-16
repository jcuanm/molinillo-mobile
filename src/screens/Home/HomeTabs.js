import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SearchStack from './stacks/SearchStack';
import ShopStack from './stacks/ShopStack';
import ProfileStack from './stacks/ProfileStack';

const HomeTabs = createMaterialBottomTabNavigator(
    {
        Shop: ShopStack,
        Search: SearchStack,
        Profile: ProfileStack,
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