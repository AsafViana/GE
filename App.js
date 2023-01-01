import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes'
import {
  StatusBar,
} from 'react-native';
import {NativeBaseProvider} from 'native-base'

export default function App() {
  return (
      <NavigationContainer>
      <StatusBar translucent={true}/>
      <NativeBaseProvider>
        <Routes/>
      </NativeBaseProvider>
    </NavigationContainer>
    
  );
}