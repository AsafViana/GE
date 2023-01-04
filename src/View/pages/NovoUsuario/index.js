import React, {useEffect, useState} from 'react'
import {  
    View, 
    ActivityIndicator, 
    Text, 
    StyleSheet, 
    ScrollView} from "react-native"
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import {StatusBar} from 'expo-status-bar'
import {
    Box,
    Center,
    Heading,
    FormControl,
    Input,
    Icon,
    Button,
    Pressable,
    Flex,
    Spacer,
} from 'native-base'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth'
import Popup from '../../component/Popup'

console.disableYellowBox=true;

export default function NovoUsuario() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [load, setLoad] = useState(false)
    const [botao, setbotao] = useState(false)
    const [show, setShow] = useState(false)
    const [avisoSenha, setAvisoSenha] = useState(false)
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

    async function cadastrar(){
        setLoad(true)

        auth()
        .createUserWithEmailAndPassword(
            email,
            password
        ).catch((error) => {
            switch (error['code']){
                case 'auth/network-request-failed':
                    alert('sem conexão com a internet')
            }
        })

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
        setLoad(false)
    }

    useEffect(() => {
        let d = verificarSenhas() 
        if(password != '' && confirmPassword != '' && email != '' && empresa != '' && d){
            setbotao(false)
            setAvisoSenha(false)
        }
        else{
            setbotao(true)
            setAvisoSenha(true)
        }
    }, [password, confirmPassword, email, empresa])


    return (
    <View className='flex-1 bg-zinc-900'>
        <Popup/>
        <StatusBar barStyle={'dark-content'} hidden={false} translucent={true} backgroundColor={'#0000'}/>
        <Animatable.View animation='fadeInLeft' delay={500} className='mt-16 ml-6 mb-8'>
            <Heading className='text-[28px] text-slate-50'>Novo Usuario:</Heading>
        </Animatable.View>

        <Animatable.View 
        animation='fadeInUp' 
        className='bg-[#03588c] flex-1 rounded-t-[30px] px-6'>

            <ScrollView>
            <FormControl mt={10}>
                    <Heading 
                    className='ml-4 mb-1 text-lg text-sky-50'  
                    tintColor='#48a1d9'>E-mail</Heading>
                    <Input
                    onChangeText={(text) => setEmail(text)}
                    placeholder='seu@email.com'
                    color='amber.100'
                    fontSize={15}
                    rounded='full'
                    InputLeftElement={
                        <Icon
                        as={
                            <Ionicons name='person' />
                        }
                        size={5}
                        ml={4}
                        className=''
                        color='#FFFFFF93'
                        />
                    }
                    />
            </FormControl>
            
            <FormControl mt={5}>
                    <Heading 
                    className='ml-4 mb-1 text-lg text-sky-50'  
                    tintColor='#48a1d9'>Empresa</Heading>
                    <Input
                    onChangeText={(text) => setEmpresa(text)}
                    placeholder='Nome da sua empresa'
                    color='amber.100'
                    fontSize={15}
                    rounded='full'
                    InputLeftElement={
                        <Icon
                        as={
                            <Ionicons name='business' />
                        }
                        size={5}
                        ml={4}
                        className=''
                        color='#FFFFFF93'
                        />
                    }
                    />
            </FormControl>
            
            <FormControl mt={5}>
                    <Heading className='ml-4 mt-2 mb-1 text-lg text-sky-50'>Senha</Heading>
                    <Input
                    placeholder='Digite sua senha'
                    onChangeText={(text) => setPassword(text)}
                    className=''
                    rounded='full'
                    color='amber.100'
                    fontSize={15}
                    type={show ? "text" : "password"}
                    InputLeftElement={
                        <Icon
                        as={
                            <Ionicons name='lock-closed'/>
                        }
                        size={5}
                        ml={4}
                        className=''
                        color='#FFFFFF93'
                        />
                    }
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="4" color="muted.400" />
          </Pressable>}
                    />                    
                </FormControl>
        
                <FormControl mt={5} isInvalid={avisoSenha}>
                    <Heading className='ml-4 mt-2 mb-1 text-lg text-sky-50'>Senha</Heading>
                    <Input
                    placeholder='Digite novamente sua senha'
                    onChangeText={(text) => setConfirmPassword(text)}
                    className=''
                    rounded='full'
                    color='amber.100'
                    fontSize={15}
                    type={show ? "text" : "password"}
                    InputLeftElement={
                        <Icon
                        as={
                            <Ionicons name='lock-closed'/>
                        }
                        size={5}
                        ml={4}
                        className=''
                        color='#FFFFFF93'
                        />
                    }
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="4" color="muted.400" />
          </Pressable>}
                    /> 
                       <Text 
                       className='ml-4 text-lg font-black mt-1' 
                       style={{color: true ? 'red' : '#0000'}} >{statusSenhas}</Text>                
                </FormControl>

            <Button
                mt='5'
                width={360}
                backgroundColor='#48a1d9'
                _text={{color: '#f1f1f1', fontWeight: 'black', fontSize: 20}}
                isDisabled={botao}
                //onPress={() => logar()}
                variant='subtle'
                isLoading={load}
                rounded='full'
                >Entrar</Button>

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
