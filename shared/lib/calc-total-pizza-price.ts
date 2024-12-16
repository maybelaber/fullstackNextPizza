import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

/**
 * Calculates total pizza price
 * @param type - type dough of chosen pizza
 * @param size - size of chosen pizza
 * @param items - list of variations of chosen pizza
 * @param ingredients - list of all ingredients
 * @param selectedIngredients - list of chosen ingredients
 * @returns number total pizza price
 */
export const calcTotalPizzaSizes = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find(item => item.size === size && item.pizzaType === type)?.price ||
		0
	const totalIngredientsPrice = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaPrice + totalIngredientsPrice
}
