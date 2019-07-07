import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SearchStack from '../../navigation/home_screen_stacks/SearchStack';
import SettingsStack from '../../navigation/home_screen_stacks/SettingsStack';
import ProfileStack from '../../navigation/home_screen_stacks/ProfileStack';

const HomeTabs = createMaterialBottomTabNavigator(
  {
    Search: SearchStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
  },
  {
    activeColor: 'rgba(255,255,255,1)',
    inactiveColor: 'rgba(255,255,255,.7)',
    barStyle: {
      backgroundColor: '#8A2BE2'
    }
  },
);

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ HomeTabs }, { headerMode: "none" });