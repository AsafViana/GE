import { Center, Text, Input, FormControl, Button, Slide, Alert, ScrollView } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'

export default function index(props) {
	const {} = props
	const [Nome, setNome] = useState()
	const [Codigo, setCodigo] = useState()
	const [Quantidade, setQuantidade] = useState()
	const [Preco, setPreco] = useState()
	const [AlertaEstaAberto, setAlertaEstaAberto] = useState(false)
	const [EnviarEstaAtivo, setEnviarEstaAtivo] = useState(false)

	function enviar() {
		setAlertaEstaAberto(!AlertaEstaAberto)
		setNome(null)
		setCodigo(null)
		setQuantidade(null)
		setPreco(null)
		setTimeout(() => {
			setAlertaEstaAberto(false)
		}, 3000)
	}

	useEffect(() => {
		if (Nome != null && Codigo != null && Quantidade != null && Preco != null) {
			setEnviarEstaAtivo(true)
		} else {
			setEnviarEstaAtivo(false)
		}
	}, [Nome, Codigo, Quantidade, Preco])

	return (
		<ScrollView scrollIndicatorInsets={{ left: 2 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} flex={1} bgColor={color.azulEscuro} pt={90}>
			<Center>
				<Slide in={AlertaEstaAberto} placement="top">
					<Alert justifyContent={'center'} status="success" safeAreaTop={0}>
						<Alert.Icon />
						<Text color={'success.600'} fontWeight={'medium'}>
							Item adicionado
						</Text>
					</Alert>
				</Slide>
				<Center bgColor={color.azulMedio} minW={100} w={350} h={600} p={10} rounded={'3xl'}>
					<FormControl m={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Nome
							</Text>
						</FormControl.Label>
						<Input fontSize={17} rounded={'2xl'} borderColor={color.branco} borderWidth={3} color={color.branco} value={Nome} onChangeText={setNome} />
					</FormControl>

					<FormControl m={2}>
						<FormControl.Label>
							<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
								Código
							</Text>
						</FormControl.Label>
						<Input fontSize={17} rounded={'2xl'} borderColor={color.branco} borderWidth={3} color={color.branco} value={Codigo} onChangeText={setCodigo} />
					</FormControl>

					<FormControl m={2}>
						<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
							Qantidade
						</Text>
						<Input fontSize={17} rounded={'2xl'} borderColor={color.branco} borderWidth={3} color={color.branco} value={Quantidade} onChangeText={setQuantidade} />
					</FormControl>

					<FormControl m={2}>
						<Text color={color.branco} bgColor={'blue.200'} fontSize={22} fontWeight={'bold'} ml={4}>
							Preço
						</Text>
						<Input fontSize={17} rounded={'2xl'} borderColor={color.branco} borderWidth={3} color={color.branco} value={Preco} onChangeText={setPreco} />
					</FormControl>
					<Button isDisabled={!EnviarEstaAtivo} onPress={enviar} m={10} bgColor={color.azulClaro} rounded={'3xl'} w={'100%'} _text={{ fontSize: 22, fontWeight: 'bold' }}>
						Enviar
					</Button>
				</Center>
			</Center>
		</ScrollView>
	)
}
