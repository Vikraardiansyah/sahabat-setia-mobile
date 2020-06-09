import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home'
import Search from './src/screens/Search'
import History from './src/screens/History'
import Login from './src/screens/Login'
import Register from "./src/screens/Register";
import Detail from './src/screens/Detail'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const { store, persistor } = configureStore()

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator()

App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={MainMenu} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

HomeStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

SearchStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Search}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}



MainMenu = () => {
  return (

    <Navigator headerMode
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = focused ? 'md-search' : 'ios-search';
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === 'History') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
            return <Ionicons name={iconName} size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'black',
      }}>
      <Screen name="Home" component={HomeStack} />
      <Screen name="Search" component={SearchStack} />
      <Screen name="History" component={History} />
    </Navigator>

  );
}

export default App;