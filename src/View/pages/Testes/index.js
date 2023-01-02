import { 
  View, 
  Text,
  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Lista from '../../../Draws/lista-boasVindas.svg'
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  JosefinSans_700Bold,
  JosefinSans_100Thin
} from '@expo-google-fonts/josefin-sans';
import {
  Jost_700Bold
} from '@expo-google-fonts/jost'
import * as Animatable from 'react-native-animatable'

export default function Testes() {
  //const [texto, setTexto] = useState('carregando..')

  return (
    <View View className='flex-1 bg-zinc-900'>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#0000'}/>
    <Animatable.View style={{flex:2, alignItems:'center', justifyContent:'center'}} animation='fadeInUp'>
      <Lista width={300}/>
    </Animatable.View>
    </View>
  );
}