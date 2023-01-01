import React, {useState, useEffect} from 'react'
import { 
    View, 
    ActivityIndicator, 
    Text, 
    StyleSheet, 
    TouchableOpacity, } from "react-native"
import {StatusBar} from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { CommonActions } from '@react-navigation/native'
import {
  useFonts,
  JosefinSans_700Bold,
  JosefinSans_100Thin
} from '@expo-google-fonts/josefin-sans';
import {
  Jost_700Bold
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading';
import {
    Box,
    Center,
    Heading,
    FormControl,
    Input,
    Icon,
    Button,
    Pressable
} from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'
import LoginDraw from '../../../Draws/login.svg'

console.disableYellowBox=true;

export default function Login() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [load, setLoad] = useState(false)
    const [acessar, setAcessar] = useState(true)
    const [invalido, setInvalido] = useState(false)
    const navigation = useNavigation()
    const [show, setShow] = useState(false)
    const [fontLoad] = useFonts({
        JosefinSans_700Bold,
        JosefinSans_100Thin,
        Jost_700Bold
      })

      useEffect(() => {
        if(password != '' && email != '' ){
            setAcessar(true)
        }
        else{
            setAcessar(false)
        }
    }, [password, email])
    
    function formatarEmail(texto){
        return texto.toString().replace(/\s/g, '').toLowerCase()
    }

    async function logar(){
        setLoad(true)
        auth().signInWithEmailAndPassword(formatarEmail(email), password)
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
        }).catch(() => {
            alert('errou as credenciais')
        })
    }
    if(!fontLoad) return <AppLoading/>
    return (
<View className='flex-1 bg-zinc-900'>
<StatusBar barStyle={'dark-content'} hidden={false} translucent={true} backgroundColor={'#0000'}/>
    <Animatable.View animation='fadeInLeft' delay={500} className='mt-16 ml-6 mb-8'>
        <Heading className='text-[28px] text-slate-50'>Bem-Vindo(a)</Heading>
    </Animatable.View>

    <Animatable.View animation='fadeInUp' className='bg-[#03588c] flex-1 rounded-t-[30px] px-6'>        
        <Center height='full'>
            <Box width='full' >
                <View style={{alignItems:'center', justifyContent:'center', marginVertical: -100, marginTop: -50}}>
                    <LoginDraw width={300}/>
                </View>

                <FormControl mt={-50} isInvalid={invalido}>
                    <Heading className='ml-4 mb-1 text-lg text-sky-50'  tintColor='#48a1d9'>E-mail</Heading>
                    <Input
                    placeholder='seu@email.com'
                    color='amber.100'
                    fontSize={15}
                    rounded='full'
                    InputLeftElement={
                        <Icon
                        as={
                            <MaterialIcons name='person' />
                        }
                        size={5}
                        ml={4}
                        className=''
                        color='#FFFFFF93'
                        />
                    }
                    />
                </FormControl>

                <FormControl isInvalid={invalido}>
                    <Heading className='ml-4 mt-4 mb-1 text-lg text-sky-50'>Senha</Heading>
                    <Input
                    placeholder='sua senha'
                    className=''
                    rounded='full'
                    color='amber.100'
                    fontSize={15}
                    type={show ? "text" : "password"}
                    InputLeftElement={
                        <Icon
                        as={
                            <MaterialIcons name='lock'/>
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

                    <FormControl.ErrorMessage className='ml-4 text-xl'>E-mai ou senha incorretos</FormControl.ErrorMessage>
                </FormControl>
                    
                <Button
                    mt='7'
                    color='#48a1d9'
                    isDisabled={!acessar}
                    variant='subtle'
                    isLoading={load}
                    rounded='full'
                    >Entrar</Button>

        <TouchableOpacity style={{
        marginTop: 14,
        alignItems: 'center'}} onPress={() => {
            navigation.navigate('NovoUsuario')
        }}>
            <Text className='text-zinc-200 font-medium text-sm'>
                Não possui conta? 
                <Text className='text-sky-300 font-black text-base'> Cadastre-se!</Text>
                </Text>
        </TouchableOpacity>
            </Box>
        </Center>
    </Animatable.View>
</View>
);
}
