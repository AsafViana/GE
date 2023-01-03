import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoasVindas from '../View/pages/BoasVindas'
import Login from '../View/pages/Login'
import Home from '../View/pages/Home'
import NovoUsuario from '../View/pages/NovoUsuario' 
import Testes from '../View/pages/Testes'
import Splash from '../View/pages/Splash'

const Stack = createNativeStackNavigator()

export default  function Routes(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Splash' options={{headerShown: false}} component={Splash}/>
            <Stack.Screen name='Teste' options={{headerShown: false}} component={Testes}/>
            <Stack.Screen name='BoasVindas' options={{headerShown: false}} component={BoasVindas}/>
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
            <Stack.Screen name='Home' options={{headerShown: false}} component={Home}/>
            <Stack.Screen name='NovoUsuario' options={{headerShown: false}} component={NovoUsuario}/>
        </Stack.Navigator>
    )
}