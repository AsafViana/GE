import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage, } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import Lista from '../../../Draws/lista-boasVindas.svg'
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  JosefinSans_700Bold,
  JosefinSans_100Thin
} from '@expo-google-fonts/josefin-sans';
import {
  Jost_700Bold
} from '@expo-google-fonts/jost'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

console.disableYellowBox=true;

export default function BoasVindas() {
  const navigation = useNavigation()
  const [fontLoad] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_100Thin,
    Jost_700Bold
  })

  async function telas() {
    let uid = await AsyncStorage.getItem('uid') 
    if(true){
        navigation.navigate('Login')
    }else{
        navigation.navigate('Teste')
    }
  }
  
  if(!fontLoad) return <AppLoading/>

  return (
    <GestureHandlerRootView className='flex-1 bg-zinc-900'>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#0000'}/>
    <Animatable.View style={{flex:2, alignItems:'center', justifyContent:'center'}} animation='fadeInUp'>
      <Lista width={300}/>
    </Animatable.View>
    
      <Animatable.View className='flex-1 bg-sky-700 rounded-t-[30px] px-5' animation='fadeInUp' delay={600}>
        <Text className='text-[24px] font-bold text-slate-50 mt-8' style={{fontFamily: 'Jost_700Bold'}}>
          Um jeito simples de organizar seu estoque!</Text>
        <Text className='text-sky-500 mt-4 text-[17px] font-bold' style={{fontFamily: 'JosefinSans_100Thin'}}>
          Faça o login para começar
          </Text>
        <TouchableOpacity onPress={telas} className='bg-sky-500 mx-20 mt-12 justify-center rounded-full w-56 h-12'>
          <Text className="text-slate-50 text-center text-[23px] text-bold" style={{fontFamily: 'Jost_700Bold'}}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </GestureHandlerRootView>
    
    
  );
}