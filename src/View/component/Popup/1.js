import React, { useState, useRef } from 'react'
import { View, Text, Touchable, TouchableOpacity, Modal, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native'


export default function Popup({name, cor}) {
  const [visible, setVisible] = useState(false)
  const scale = useRef(new Animated.Value(0)).current
  const options = [
    {
    title: 'teste',
    icon: 'antenna',
    action: () => alert('teste'),
    },
    {
    title: 'teste 2', 
    icon: 'video',
    action: () => alert('teste 2'),
  },
]

function resizeBox(to){
  to === 1 && setVisible(true);
  Animated.timing(scale, {
    toValue: to,
    useNativeDriver:true,
    duration:200,
    easing:Easing.linear,
  }).start(() => to === 0 && setVisible(false))
}

 return (
    <>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Feather name={name} size={26} color={cor}/>
      </TouchableOpacity>

      <Modal transparent visible={visible}>
        <SafeAreaView style={{flex:1}} onTouchStart={() => resizeBox(0)}>

          <Animated.View style={[
            styles.popup,
            {
              opacity: scale.interpolate({inputRange: [0,1], outputRange: [0,1]})
            },
            {
              transform:[{scale}]
            }]}>
            {options.map((op, i) => (
              <TouchableOpacity style={[styles.options, {borderBottomWidth:i === options.length - 1 ? 0 : 1}]} key={i} onPress={op.action}>
                <Text>
                  {op.title}
                </Text>
                <Icon style={{marginLeft: 10}} name={op.icon} size={26} color={'#212121'}/>
              </TouchableOpacity>
            ))}
          </Animated.View>

        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  popup: {
    borderRadius: 8,
    borderColor:'#333',
    borderWidth:1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 56,
    right: 50
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderColor: '#ccc'
  }
})