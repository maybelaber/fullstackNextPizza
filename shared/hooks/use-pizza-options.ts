'use client'

import { ProductItem } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { Variant } from '../components/shared/group-variants'
import { PizzaSize, PizzaType } from '../constants/pizza'
import { getAvailablePizzaSizes } from '../lib'

interface ReturnProps {
	size: PizzaSize
	type: PizzaType
	selectedIngredients: Set<number>
	availablePizzaSizes: Variant[]
	currentItemId?: number
	setSize: (size: PizzaSize) => void
	setType: (size: PizzaType) => void
	toggleIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20)
	const [type, setType] = useState<PizzaType>(1)
	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
		new Set<number>([])
	)

	const availablePizzaSizes = getAvailablePizzaSizes(type, items)

	const currentItemId = items.find(
		item => item.pizzaType === type && item.size === size
	)?.id

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes.find(
			item => Number(item.value) === size && !item.disabled
		)
		const availableSize = availablePizzaSizes?.find(item => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize)
		}
	}, [type])

	return {
		size,
		type,
		selectedIngredients,
		availablePizzaSizes,
		currentItemId,
		setSize,
		setType,
		toggleIngredient,
	}
}
