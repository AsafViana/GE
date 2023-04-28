import { Center, VStack, Box, ScrollView, Select, FlatList, CheckIcon } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'
import CardItem from '../../component/CardItem'

export default function index(props) {
	const {} = props
	const [Categoria, setCategoria] = useState('Todos')
	const dados2 = [
		{ id: 'Todos', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 1', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 2', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 3', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 4 ', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 5', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
		{ id: 'Categoria 6', render: <CardItem nome="Item 1" quantidade={10} categoria="Categoria" /> },
	]

	return (
		<Center flex={1} background={color.azulEscuro}>
			<Center backgroundColor={color.azulEscuro}>
				<Select
					_selectedItem={{ bgColor: color.azulClaro, rounded: 'lg', _text: { color: color.branco, fontWeight: 'bold', fontSize: 20 }, endIcon: <CheckIcon size="7" />, _icon: { color: color.branco } }}
					fontWeight={'black'}
                    fontSize={20}
					borderWidth={0}
					color={color.branco}
					selectedValue={Categoria}
					minW={200}
					mt={1}
					onValueChange={(item) => setCategoria(item)}>
					{dados2.map((obj) => (
						<Select.Item label={obj.id} value={obj.id} />
					))}
				</Select>
			</Center>
			<ScrollView>
				<FlatList data={dados2} keyExtractor={(item) => item.id} renderItem={({ item }) => item.render} />
			</ScrollView>
		</Center>
	)
}
