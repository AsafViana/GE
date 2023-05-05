import { Center, Text, Box, ScrollView, Select, FlatList, CheckIcon } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'
import CardItem from '../../component/CardItem'
import { database, ref, get, child } from '../../Service/firebaseConfig'
import { getData } from '../../Service/asyncStorage'
import { RefreshControl } from 'react-native'

interface Resumo {
	nome: string
	quantidade: number
}

export default function index(props) {
	const {} = props
	const [Categoria, setCategoria] = useState('Todos')
	const [TemDados, setTemDados] = useState(false)
	const [Estoque, setEstoque] = useState<Array<Resumo>>()
	const [isRefreshing, setIsRefreshing] = useState(false)

	function pegaDados() {
		return new Promise( (resolve, reject) => {
			getData('uid').then((uid) => {
				const starCountRef = ref(database)
				get(child(starCountRef, 'estoques/' + uid)).then((snapshot) => {
					const data = snapshot.val()
					const array = []
		
					if (data) {
						setTemDados(true)
						Object.values(data).map((dado: Resumo) => {
							const resumo = {
								nome: dado.nome,
								quantidade: dado.quantidade,
							}
							array.push(resumo)
						})
						setEstoque(array)
					}
				}) })
		})
	}
	pegaDados()

	const onRefresh = async () => {
		setIsRefreshing(true)
		pegaDados()
		setIsRefreshing(false)
	}

	return (
		<Center flex={1} background={color.azulEscuro}>
			<Center>
				<Select
					_selectedItem={{ bgColor: color.azulClaro, rounded: 'lg', _text: { color: color.branco, fontWeight: 'bold', fontSize: 20 }, endIcon: <CheckIcon size="7" />, _icon: { color: color.branco } }}
					fontWeight={'black'}
					fontSize={20}
					borderWidth={0}
					color={color.branco}
					selectedValue={'Todos'}
					minW={200}
					mt={1}
					onValueChange={(item) => setCategoria(item)}>
					<Select.Item label="Todos" value="Todos" />
				</Select>
			</Center>
				{TemDados ? <></> : <Text mt={30} fontWeight={'black'} fontSize={'2xl'} color={color.ciza}>Sem conteúdo</Text>}
				<FlatList data={Estoque} keyExtractor={(item: Resumo) => item.nome} renderItem={({ item }) => <CardItem nome={item.nome} quantidade={item.quantidade} />} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} />
		</Center>
	)
}
