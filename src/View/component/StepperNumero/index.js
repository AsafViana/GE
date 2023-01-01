import React, { useState } from "react";
import {PlusIcon, MinusIcon} from 'react-native-heroicons/solid'
import { TouchableOpacity, StyleSheet, TextInput, View } from "react-native";


export default function StepperNumero(onChange) {
    const [quantia, setQuantia] = useState(0)
    return (
    <View style={styles.input2}>

        {/* Menos */}
        <TouchableOpacity style={styles.button}>
        <MinusIcon size={30} style={{color: '#f1f1f1'}}/>
        </TouchableOpacity>

        <TextInput 
    placeholder='Quantidade'
    placeholderTextColor="#fff"
    keyboardType="decimal-pad"
    value={quantia.toString()}
    onChangeText={(val) => {setQuantia(parseInt(val))}}
    style={{marginTop:10, alignContent:"center", fontSize: 17, color: '#fff'}} />

    {/* Mais botao */}
    <TouchableOpacity style={styles.button} onPress={() => {
        console.log(String(quantia).length)
        setQuantia(quantia+1)
    } 
        }
        >
        <PlusIcon size={30} style={{color: '#f1f1f1'}}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    input2: {
        borderBottomWidth: 1,
        height: 50,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#48a1d9',
        color: '#fff',
        borderRadius: 30,
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    button:{
    backgroundColor: '#03588c',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    }
    });