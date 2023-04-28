import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/Usuario'

const {Screen, Navigator} = createStackNavigator()

export function StackRoutes(){
    return (
        <Navigator>
            <Screen name="Log" component={Login} />
        </Navigator>
    )
}
