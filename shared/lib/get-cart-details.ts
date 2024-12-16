import { calcCartItemTotalPrice } from '.'
import { CartDTO } from '../services/dto/cart.dto'

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	disabled?: boolean
	pizzaType?: number | null
	pizzaSize?: number | null
	type?: number | null
	ingredients: Array<{ name: string; price: number }>
}

interface IReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): IReturnProps => {
	const items = data.items.map(item => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		disabled: false,
		ingredients: item.ingredients.map(ingredient => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	})) as CartStateItem[]

	return {
		items,
		totalAmount: items.reduce((acc, item) => acc + item.price, 0),
	}
}
