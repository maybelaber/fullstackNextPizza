import { Ingredient } from '@prisma/client'
import { mapPizzaSize, mapPizzaType } from '../../constants'

import React from 'react'

interface IProps {
	size: 20 | 30 | 40
	type: 1 | 2
	ingredients: Ingredient[]
}

export const OrderDescription: React.FC<IProps> = ({
	size,
	type,
	ingredients,
}) => {
	if (!size || !type) return null

	const ingredientsString = ingredients
		.map(ingredient => ingredient.name)
		.join(', ')

	return (
		<>
			{mapPizzaSize[size]} {size} см, {mapPizzaType[type]} тесто
			<br /> {ingredientsString ? `+ ${ingredientsString}` : ''}
		</>
	)
}
