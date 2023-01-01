import { View, Text, StyleSheet, StatusBar, Button } from 'react-native'
import React, {useState} from 'react'
import {UserIcon, ChevronDownIcon} from 'react-native-heroicons/outline'
import Popup from '../Popup/1'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function index() {
    const [popup, setPopup] = useState(false)
    

    return (
        <SafeAreaView>
            <View style={styles.container}> 
                <StatusBar backgroundColor='#48a1d9' barStyle='dark-content'/>
                <Text style={styles.nome}>Empresa</Text>
                <View style={styles.fotoUser}>
                    <UserIcon style={styles.user}/>
                </View>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#48a1d9',
        padding: '5%',
        flexDirection: 'row', 
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomEndRadius: 43,
        borderBottomStartRadius: 43,
    },
    nome: {
        color: '#f1f1f1',
        fontWeight: '600',
        fontSize: 20,
        justifyContent: 'center'
    },
    user: {
        color: '#f1f1f1'
    },
    fotoUser:{
        backgroundColor: '#03588c',
        padding: '3%',
        borderRadius: 25,
        marginEnd: 20,
        justifyContent: 'center'
    }
})
