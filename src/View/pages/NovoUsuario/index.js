import React, {useEffect, useState} from 'react'
import {  
    View, 
    ActivityIndicator, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    ScrollView} from "react-native"
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

console.disableYellowBox=true;

export default function NovoUsuario() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [load, setLoad] = useState(false)
    const [botao, setbotao] = useState(true)
    const [estiloBotao, setEstiloBotao] = useState(styles.buttonDes)
    const [statusSenhas, setStatusSenhas] = useState('')
    const navigation = useNavigation()
    
    function formatarEmail(texto){
        return texto.toString().replace(/\s/g, '').toLowerCase()
    }

    function verificarSenhas(){
        if(password != confirmPassword){
            setStatusSenhas('Senhas incompativeis')
            return false
        }else if (password.length < 6 && password.length > 0){
            setStatusSenhas('Senha com menos de 6 caracteres')
            return false
        }else{
            setStatusSenhas('')
            return true
        }
    }

    async function cadastrar(dados){
        firestore()
        .collection('dadosUsuario')
        .doc('usuarios')
        .collection(email)
        .doc('dados')
        .set({
            email: email,
            nomeEmpresa: empresa,
        })
        .then(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: 'Home'}
                    ]
                }
                )
            )
        })
    }

    useEffect(() => {
        let d = verificarSenhas()
        if(password != '' && confirmPassword != '' && email != '' && empresa != '' && d){
            setbotao(false)
            setEstiloBotao(styles.buttonAbi)
        }
        else{
            setbotao(true)
            setEstiloBotao(styles.buttonDes)
        }
    }, [password, confirmPassword, email, empresa])


    return (
    <View style={styles.conteiner}>
        <Animatable.View animation='slideInDown' delay={500} style={styles.conteinerHeader}>
            <Text style={styles.message}>Novo Usuario:</Text>
        </Animatable.View>

        <Animatable.View animation='zoomIn' style={styles.conteinerForm}>

            <ScrollView>
                <Text style={styles.title}>Email</Text>
            <TextInput 
            keyboardType='email-address'
            placeholder='Digite seu email...'
            placeholderTextColor="#a1a1a1"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}/>
            
            <Text style={styles.title}>Empresa</Text>
            <TextInput 
            placeholder='Digite o nome da sua empresa...'
            placeholderTextColor="#a1a1a1"
            style={styles.input}
            onChangeText={(text) => setEmpresa(text)}/>
            
            <Text style={styles.title}>Senha</Text>
            <TextInput 
            placeholder='Digite sua senha...'
            placeholderTextColor="#a1a1a1"
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}/>
            
            <Text style={styles.title}>Confirma senha</Text>
            <TextInput placeholder='Confirme sua senha...'
            placeholderTextColor="#a1a1a1"
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}/>
            <Text style={{color: '#ff0000' }}>{statusSenhas}</Text>

            <TouchableOpacity disabled={botao} 
            onPress={cadastrar} 
            style={estiloBotao}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <ActivityIndicator 
                animating = {load}
                color = '#48a1d9'
                size = "large"
                style={{marginTop: 20}} />
            </ScrollView>
            
        </Animatable.View>
    </View>
);
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        backgroundColor: '#03588c'
    },

    conteinerHeader:{
        marginTop: '20%',
        marginBottom: '8%',
        paddingStart: '5%'
    },

    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },

    conteinerForm:{
        backgroundColor:'#212121',
        flex: 1,
        borderRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginBottom: '-5%'
    },

    title:{
        fontSize: 20,
        marginTop: 28,
        color: '#48a1d9'
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderBottomColor: '#48a1d9',
        color: '#fff'
    },

    buttonDes:{
        backgroundColor: '#a1a1a1',
        width: '100%',
        borderRadius:4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonAbi:{
        backgroundColor: '#48a1d9',
        width: '100%',
        borderRadius:4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText:{
        color: '#212121',
        fontSize: 18,
        fontWeight: 'bold'
    },

    buttonRegister: {
        marginTop: 14,
        alignItems: 'center',
    },

    buttonRegisterText: {
        color: '#a1a1a1'
    },
})
