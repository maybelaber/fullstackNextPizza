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
	totalAmountWithFees: number
	totalAmount: number
	vatPrice: number
}

export const VAT = 15
export const DELIVERY_PRICE = 250

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

	const totalAmount = items.reduce((acc, item) => acc + item.price, 0)
	const vatPrice = (totalAmount * VAT) / 100
	const totalAmountWithFees = totalAmount + DELIVERY_PRICE + vatPrice

	return {
		items,
		totalAmountWithFees,
		totalAmount,
		vatPrice,
	}
}
