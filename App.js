/**
*
* App.js
* Start of the file
*
* @author - Ahamed
* @date   - 26 August 2020
*
***/
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, TouchableOpacity, TouchableHighlight, StatusBar} from 'react-native';
import CardFlip from 'react-native-card-flip';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

// ALL SHARED FILES
import * as Utils from './src/shared/utils';
import * as Constant from './src/shared/constant';
import { styles } from './src/shared/stylesheet';
import { Colors } from './src/shared/colors';

// ALL NAVIGATION
import { HomeScreen } from './src/view/home';
import { PlayScreen } from './src/view/play';

//console.disableYellowBox = Constant.GENERIC.DISABLE_LOG;
export default App = (props) => {

  // DECLARE NAVIGATION
  const Stack = createStackNavigator();

  // LOCAL VARIABLE DECLARATION
  const navigatorConfig = {
    title: '',
    headerBackTitle: '',
    headerShown: false,
    gestureEnabled: false
  }

  // USE EFFECT ON LOAD PROCESS
  useEffect(() => {
    // UPDATE STATUS COLOR
    StatusBar.setBarStyle(Constant.GENERIC.STATUS_BAR);
  }, []);

  return (
    <>
      <StatusBar hidden/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen name="Home" component={HomeScreen}  options={{...navigatorConfig}}/>
          <Stack.Screen name="PlayGame" component={PlayScreen}  options={{...navigatorConfig}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
