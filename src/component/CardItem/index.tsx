import { Center, Text, Box, VStack, Image, HStack, Pressable } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import {color} from '../../../env.json'

export default function index(props) {
	const { nome, categoria, quantidade } = props
	return (
		<Box bgColor={color.azulClaro} my={6} py="4" px="10" rounded="3xl" width={375} maxWidth="100%">
			<HStack justifyContent="space-between" alignItems={'center'}>
				<Box justifyContent="space-between">
					<VStack space="2">
						{/* Categoria */}
						<Text fontSize="sm" color={color.branco}>
							{categoria}
						</Text>

						{/* Nome */}
						<Text textTransform='uppercase' color={color.branco} fontWeight={'bold'} fontSize="xl">
							{nome}
						</Text>
					</VStack>
					<Pressable rounded="xs" bg={color.azulMedio} alignSelf="flex-start" py="1" px="3">
						{/* Quantidade */}
						<Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color={color.branco}>
							Peças: {quantidade}
						</Text>
					</Pressable>
				</Box>
				<FontAwesome5 name='box' color={color.branco} size={64}/>
			</HStack>
		</Box>
	)
}
