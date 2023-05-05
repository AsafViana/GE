import { createStackNavigator } from '@react-navigation/stack'
import { StackRoutes } from './stack.routes'
import { LogadoRoutes } from './logado.routes'
import { DeslogadoRoutes } from './deslogado.routes'
import SplashScreen from '../screen/SplashScreen'

const { Screen, Navigator } = createStackNavigator()

export function RoutesRoutes() {

	return (
		<Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
			<Screen name='SplashScreen' component={SplashScreen} />
			<Screen name="Stack" component={StackRoutes} />
			<Screen name="Logado" component={LogadoRoutes} />
			<Screen name="Deslogado" component={DeslogadoRoutes} />
		</Navigator>
	)
}
