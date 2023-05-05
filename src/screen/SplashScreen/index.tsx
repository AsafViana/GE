import { View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { color } from '../../../env.json'
import { getData } from '../../Service/asyncStorage'
import { Center, Image } from 'native-base'
import { auth, signInWithEmailAndPassword } from '../../Service/firebaseConfig'

export default function index(props) {
	const {} = props
	const navigation = useNavigation()

	getData('uid')
		.then((dado) => {
			let email
            let senha
			if (dado != '' && dado != null && dado !== 'nada') {
				getData('email').then((Email) => {
					email = Email
					getData('senha').then((Senha) => {
                        senha = Senha
						signInWithEmailAndPassword(auth, email, senha).then(() => {
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [{ name: 'Logado' }],
								})
							)
						})
					})
				})
			} else {
				try {
					navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [{ name: 'Deslogado' }],
						})
					)
				} catch (e) {
					alert(e)
				}
			}
		})
		.catch((e) => {
			alert(e)
		})

	//navigation.navigate('Deslogado')

	return (
		<Center flex={1} bgColor={color.azulEscuro}>
			<Image source={require('../../../assets/splash.png')} size={500} />
		</Center>
	)
}
