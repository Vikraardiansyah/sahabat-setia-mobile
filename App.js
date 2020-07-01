import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import AllBooks from './src/screens/AllBooks';
import GenreBook from './src/screens/GenreBook';
import Search from './src/screens/Search';
import Account from './src/screens/Account';
import History from './src/screens/History';
import Order from './src/screens/Order';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Detail from './src/screens/Detail';
import LandingPage from './src/screens/LandingPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {store, persistor} = configureStore();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class App extends Component {
  HomeStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName={Home}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AllBooks" component={AllBooks} />
        <Stack.Screen name="GenreBook" component={GenreBook} />
      </Stack.Navigator>
    );
  };

  AccountStack = () => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName={Account}>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
    );
  };

  MainMenu = () => {
    return (
      <Tab.Navigator
        headerMode
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Account') {
              iconName = focused ? 'account-circle' : 'account-circle-outline';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#7e7e7e',
          keyboardHidesTabBar: true,
          activeBackgroundColor: '#F4F4F4',
          inactiveBackgroundColor: '#F4F4F4',
        }}
        initialRouteName={Home}>
        <Tab.Screen name="Home" component={this.HomeStack} />
        <Tab.Screen name="Account" component={this.AccountStack} />
      </Tab.Navigator>
    );
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        getData: true,
      });
    }, 1000);
  }

  state = {
    getData: false,
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              {this.state.getData ? (
                <>
                  <Stack.Screen name="Home" component={this.MainMenu} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="LandingPage" component={LandingPage} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Splash" component={Splash} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
