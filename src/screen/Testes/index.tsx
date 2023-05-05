import { Center, Text } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Platform, RefreshControl, ScrollView } from 'react-native'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { color } from '../../../env.json'

export default function index(props) {
	const [refreshing, setRefreshing] = React.useState(false)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
        alert('teste')
		setTimeout(() => {
			setRefreshing(false)
		}, 2000)
	}, [])

	const {} = props
	return (
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					backgroundColor: 'pink',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<Text>Pull down to see RefreshControl indicator</Text>
			</ScrollView>
	)
}
