import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native'

export default function Splash() {
    const navigation = useNavigation()
    const [rodou, setRodou] = useState(false)

    if(!rodou){
      return (
   <View className='flex-1 items-center justify-center bg-zinc-900'>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#0000'}/>
    <LottieView
            source={require('../../../Animations/splash.json')}
            autoPlay={true}
            loop={false}
            onAnimationFinish={() => {navigation.navigate('BoasVindas'); setRodou(true)}}/>
   </View>
  );
    }
    else{
    navigation.dispatch(
      CommonActions.reset({
          index: 1,
          routes: [
              {name: 'BoasVindas'}
          ]
      }
      )
    )
    }
 
}