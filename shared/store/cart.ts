import { create } from 'zustand'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'
import { Api } from '../services/api-client'
import { CreateCartItemValues } from '../services/dto/cart.dto'

export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]

	setItems: (items: CartStateItem[]) => void

	/* Getting items from cart */
	fetchCartItems: () => Promise<void>

	/* Query for updating quantity of items in cart */
	updateItemQuantity: (id: number, quantity: number) => Promise<void>

	/* Query for adding items to cart */
	addCartItem: (values: CreateCartItemValues) => Promise<void>

	/* Query for deleting items from cart */
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>(set => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	setItems(items: CartStateItem[]) {
		set({ items })
	},

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item =>
					item.id === id ? { ...item, disabled: true } : item
				),
			}))
			const data = await Api.cart.removeCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item => ({ ...item, disabled: false })),
			}))
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
