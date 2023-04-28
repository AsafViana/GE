import { createStackNavigator } from '@react-navigation/stack'
import { StackRoutes } from './stack.routes'
import { LogadoRoutes } from './logado.routes'
import { DeslogadoRoutes } from './deslogado.routes'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Service/firebaseConfig'

const {Screen, Navigator} = createStackNavigator()

export function RoutesRoutes(){
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.warn('logado')
            }else{
                console.warn('deslogado')
            }

        })
      }, []);
    return (
        <Navigator initialRouteName='Deslogado' screenOptions={{headerShown:false}}>
            <Screen name="Stack" component={StackRoutes} />
            <Screen name="Logado" component={LogadoRoutes} />
            <Screen name="Deslogado" component={DeslogadoRoutes} />
            
        </Navigator>
    )
}

