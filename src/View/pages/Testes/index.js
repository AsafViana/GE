import React, { useState, useEffect } from 'react'
import { View, Button, Text, AsyncStorage, Linking } from 'react-native'

export default function Testes() {
  const [texto, setTexto] = useState('carregando..')

  return (
    <View className="flex-1 items-center justify-center">
      
      <Text>{texto}</Text>
      
      <Button title='click' onPress={async () => {Linking.openURL('https://medium.com/@kelvinpompey.me/things-to-look-out-for-using-supabase-with-react-native-9638b23e98c2')}}/>
    </View>
  );
}