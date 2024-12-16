import { prisma } from '@/prisma/prisma-client'
import { Cart, CartItem } from '@prisma/client'
import { areArraysEqual } from '.'
import { CreateCartItemValues } from '../services/dto/cart.dto'

export const getCartItem = async (
	userCart: Cart,
	data: CreateCartItemValues
): Promise<CartItem | null> => {
	const findCartItems = await prisma.cartItem.findMany({
		where: {
			cartId: userCart.id,
			productItemId: data.productItemId,
		},

		include: {
			ingredients: true,
		},
	})

	for (let i = 0; i < findCartItems.length; i++) {
		if (
			areArraysEqual(
				findCartItems[i].ingredients.map(item => item.id),
				data.ingredientsIds || []
			)
		) {
			return findCartItems[i]
		}
	}
	return null
}
