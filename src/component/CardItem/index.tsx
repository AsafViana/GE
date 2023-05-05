import { Center, Text, Box, VStack, Image, HStack, Pressable, Button } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { color } from '../../../env.json'
import { database, onValue, ref } from '../../Service/firebaseConfig'
import { getData } from '../../Service/asyncStorage'

export default function index(props) {
	const { nome, categoria, quantidade } = props
	const [showDetails, setShowDetails] = useState(false)

	const handlePress = () => {
		setShowDetails(true)
	}

	function handleMais() {
		getData('uid').then((uid) => {
			const starCountRef = ref(database, `estoques/${uid}/` )
			onValue(starCountRef, (snapshot) => {
				const data = snapshot.val()
			})
		})
	}

	return (
		<Pressable onPress={handlePress} bgColor={color.azulClaro} my={6} py="4" px="10" rounded="3xl" width={375} maxWidth="100%">
			<HStack justifyContent="space-between" alignItems={'center'}>
				<Box justifyContent="space-between">
					<VStack space="2">
						{/* Nome */}
						<Text textTransform="uppercase" color={color.branco} fontWeight={'bold'} fontSize="xl">
							{nome}
						</Text>
					</VStack>
					<Box rounded="xs" bg={color.azulMedio} alignSelf="flex-start" mt='3' py="1" px="3">
						{/* Quantidade */}
						<Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color={color.branco}>
							Peças: {quantidade}
						</Text>
					</Box>

					{showDetails && (
						<Box mt={5}>
							<Box flexDirection={'row'} justifyContent={'space-between'}>
							<AntDesign name="minuscircle" color={color.branco} size={40} />
							<AntDesign name="pluscircle" color={color.branco} size={40} />
							</Box>
						</Box>
					)}
				</Box>
				<FontAwesome5 name="box" color={color.branco} size={64} />
			</HStack>
		</Pressable>
	)
}
