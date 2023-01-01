import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '../../component/Header'
import Add from '../../component/Adicionar'

console.disableYellowBox=true;

export default function Home() {
    const [visible, setVisible] = useState(false)
    return (
        <View style={styles.container}>
            <Header/>
            
            <Add visivel={true}/>
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',

    },
    adicionar: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213b',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        },
        backgroundColor: '#03588c',
        padding: '3%',
        borderRadius: 60,
        marginEnd: 20,
        justifyContent: 'center',
        bottom: -680,
        right: 10
    }
})