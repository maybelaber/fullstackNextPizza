import { Ingredient, ProductItem } from '@prisma/client'
import { calcTotalPizzaSizes } from '.'
import { mapPizzaType, PizzaSize, PizzaType } from './../constants/pizza'
export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const totalPrice = calcTotalPizzaSizes(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)

	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`

	return { totalPrice, textDetails }
}
