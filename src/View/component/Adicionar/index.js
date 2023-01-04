import React, { useState, useEffect } from "react";
import {PlusIcon, MinusIcon, XMarkIcon} from 'react-native-heroicons/solid'
import { 
  AsyncStorage, 
  StatusBar, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Alert, 
  KeyboardAvoidingView, 
  Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from 'lottie-react-native'
//import firebase from '../../../Service/firebaseConfig'

console.disableYellowBox=true;

export function Adicionar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [colorStatusBar, setColorStatusBar] = useState('#48a1d9')
  const [nome, setNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [quantia, setQuantia] = useState(0)
  const [preco, setPreco] = useState(0)
  const [anim, setAnim] = useState(false)
  const [usoNome, setUsoNome] = useState(false)
  const [usoQuant, setUsoQuant] = useState(false)
  const [usoCodigo, setUsoCodigo] = useState(false)
  const [usoPreco, setUsoPreco] = useState(false)
  const [botao, setBotao] = useState(false)

  async function enviar(){
    let uid = await AsyncStorage.getItem('uid')
    console.log(uid)
    await Database().ref(uid).child('item').set('def')   
  }

  useEffect(() => {

    let resultado = nome.length > 0 && quantia > 0 && codigo.length > 0 && preco > 0

    if (resultado){
      setBotao(false)
    }
  }, [nome, codigo, quantia, preco])

  return (
    <View>
      <StatusBar backgroundColor={colorStatusBar}/>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {setModalVisible(false); setColorStatusBar('#48a1d9')}}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(33, 33, 33, 0.7)'}}>

          {/* Animação */}
          <Modal
          transparent={true}
          visible={anim}>
            <View style={{flex: 1, backgroundColor: 'rgba(3, 88, 140, 0.7)'}}>
              <LottieView
            source={require('../../../Animations/confirmed-tick.json')}
            autoPlay={true}
            loop={false}
            onAnimationFinish={() => setAnim(false)}/>
            </View>
            
          </Modal>

          {/* Sair */}
          <TouchableOpacity 
          style={styles.sair}
          onPress={() => {setModalVisible(false); setColorStatusBar('#48a1d9')}}
          >
            <XMarkIcon size={30} style={{color: '#f1f1f1'}}/>
          </TouchableOpacity>

          <View style={styles.modalView}>

          {/* Titulo */}
          <Text style={styles.title}>Novo Item</Text>

          {/* Nome */}
          <Text style={styles.subtitulo}>Nome</Text>

          <View style={styles.input}>
            <TextInput 
          placeholder='Nome do produto...'
          placeholderTextColor="rgba(241, 241, 241, 0.6)"
          onChangeText={(val) => {
            setNome(val)
          }}
          style={{margin:15, alignContent:"center", fontSize: 17, color: '#fff'}} />
          </View>
          
          {/* Quantidade */}
          <Text style={styles.quantidade}>Quantidade</Text>

          <View style={styles.input2}>

            {/* Menos */}
            <TouchableOpacity style={styles.button} onPress={() => {
              if (quantia === 0)
                setQuantia(0)
              else
                setQuantia(quantia-1)}}>
              <MinusIcon size={30} style={{color: '#f1f1f1'}}/>
            </TouchableOpacity>

            <TextInput
          placeholderTextColor="#fff"
          keyboardType="decimal-pad"
          value={quantia.toString()}
          textAlign="center"
          onChangeText={(val) => {
            let valor = parseInt(val)
            console.log(valor) 
            if(null === valor || NaN === valor)
              setQuantia(0)
            else if(valor < 99999999)
              setQuantia(valor)
          }}
          style={{marginTop:10, alignContent:"center", fontSize: 17, color: '#fff'}} />

          {/* Mais */}
          <TouchableOpacity style={styles.button} onPress={() => {
              if (quantia >= 99999999)
                setQuantia(99999999)
              else
                setQuantia(quantia+1)}}>
              <PlusIcon size={30} style={{color: '#f1f1f1'}}/>
            </TouchableOpacity>
          </View>

          {/* Codigo */}
          <Text style={styles.subtitulo}>Codigo</Text>

          <View style={styles.input}>
            <TextInput 
          placeholder='Codigo de identificação...'
          placeholderTextColor="rgba(241, 241, 241, 0.6)"
          onChangeText={(val) => {setCodigo(val)}}
          style={{margin:15, alignContent:"center", fontSize: 17, color: '#fff'}} />
          </View>
          
          {/* Preço */}
          <Text style={styles.subtitulo}>Preço</Text>

          <View style={styles.input2}>

            {/* Menos */}
            <TouchableOpacity style={styles.button} onPress={() => {
              if (preco === 0)
                setPreco(0)
              else
                setPreco(preco-0.5)
              if (preco > 0){
                setUsoPreco(true)
              }}}>
              <MinusIcon size={30} style={{color: '#f1f1f1'}}/>
            </TouchableOpacity>

            <TextInput
            placeholderTextColor="#fff"
            keyboardType="decimal-pad"
            value={preco.toString()}
            textAlign="center"
            onChangeText={(val) => {
            let valor = parseInt(val)
            console.log(valor) 
            if(null === valor || NaN === valor)
              setPreco(0)
            else if(valor < 99999999)
              setPreco(valor)
            
            if (val.length > 0){
              setUsoPreco(true)
            }
            }}
            style={{marginTop:10, alignContent:"center", fontSize: 17, color: '#fff'}} />

            {/* Mais */}
            <TouchableOpacity style={styles.button} onPress={() => {
              if (preco >= 99999999)
                setPreco(99999999)
              else
                setPreco(preco+0.5)
              if (preco > 0){
                setUsoPreco(true)
              }}}>
              <PlusIcon size={30} style={{color: '#f1f1f1'}}/>
            </TouchableOpacity>
          </View>
            
          {/* Enviar */}
          <Pressable style={styles.button2} 
          onPress={() => enviar()} 
          disabled={botao}
          >
            <Text style={{color: !botao ? '#fff' : '#564a55', 
            fontSize: 25, 
            fontWeight: "700"}}>Enviar</Text>
          </Pressable>
          </View>
          
        </SafeAreaView>
        
      </Modal>
      </KeyboardAvoidingView>
      
      
      <TouchableOpacity style={styles.adicionar} onPress={() => {
              setModalVisible(!modalVisible)
              setColorStatusBar('rgb(44, 71, 88)')
          }}>
          <PlusIcon size={50} style={{color: '#f1f1f1', size: 30}}/>
        </TouchableOpacity>
    </View>
  
  );
}

const styles = StyleSheet.create({
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
    bottom: -640,
    right: 10
},
  modalView: {
    margin: 20,
    backgroundColor: "#212121",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderEndColor: '#48a1d9',
    borderEndWidth: 5,
    borderTopColor: '#48a1d9',
    borderTopWidth: 5,
    borderStartColor: '#48a1d9',
    borderStartWidth: 5,
    borderBottomColor: '#48a1d9',
    borderBottomWidth: 5,
  },
  
  title:{
    fontSize: 30,
    marginBottom: 20,
    color: '#48a1d9',
    fontWeight: "900"
},

input: {
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#48a1d9',
    color: '#fff',
    borderRadius: 30,
    width: '100%',
},

input2: {
  borderBottomWidth: 1,
  height: 50,
  marginBottom: 20,
  fontSize: 25,
  backgroundColor: '#48a1d9',
  color: '#fff',
  borderRadius: 30,
  width: '100%',
  flexDirection: 'row', 
  alignItems: 'flex-start',
  justifyContent: 'space-between',
},

button2:{
backgroundColor: '#03588c',
borderRadius: 30,
width: 150,
height: 50,
alignItems: 'center',
justifyContent: 'center',
marginTop: 10
},

button:{
backgroundColor: '#03588c',
borderRadius: 30,
width: 90,
height: 50,
alignItems: 'center',
justifyContent: 'center',
},

sair:{
backgroundColor: '#03588c',
borderRadius: 30,
width: 50,
height: 50,
alignItems: 'center',
justifyContent: 'center',
left: '80%',
marginBottom: 30
},

subtitulo: {
  color: '#48a1d9',
  left: -80,
  fontSize: 20,
  marginBottom: 3,
  alignContent: "flex-start",
  fontWeight: "700"
},

quantidade: {
  color: '#48a1d9',
  left: -60,
  fontSize: 20,
  marginBottom: 3,
  alignContent: "flex-start",
  fontWeight: "700"
},
});