import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native'
import { color } from '../../../env.json'
import { getData } from '../../Service/asyncStorage'
import { Center, Image } from 'native-base'

export default function index(props) {
	const {} = props
	const navigation = useNavigation()

        
        getData('uid').then((dado) => {
            
            if (dado != '' || dado != null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'Logado' }],
                    })
                )
            } else {
                try{
                    navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'Deslogado' }],
                    })
                )
                } catch(e){
                    alert(e)

                }
                
            }
        })
        .catch(e => {
            alert(e)
        })

	return (
		<Center flex={1} bgColor={color.azulEscuro}>
            <Image
            source={require('../../../assets/splash.png')}
            size={500}/>
			{/* <LottieView
				source={require('../../Animations/splash.json')}
				autoPlay={true}
				loop={false}
				 onAnimationFinish={() => {
					getData('uid').then((dado) => {
						if (dado != '' || dado != null) {
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [{ name: 'Logado' }],
								})
							)
						} else {
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [{ name: 'Deslogado' }],
								})
							)
						}
					})
				}} 
			/> */}
		</Center>
	)
}
