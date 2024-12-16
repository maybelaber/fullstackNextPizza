import { prisma } from '@/prisma/prisma-client'
import { cookies } from 'next/headers'

export const getCartFromCookies = async () => {
	const cookieStore = cookies()
	const cartToken = cookieStore.get('cartToken')?.value

	if (!cartToken) {
		throw new Error('Cart token not found')
	}

	/* Find user cart with token */
	const userCart = await prisma.cart.findFirst({
		include: {
			user: true,
			items: {
				include: {
					ingredients: true,
					productItem: {
						include: {
							product: true,
						},
					},
				},
			},
		},
		where: {
			token: cartToken,
		},
	})

	if (!userCart) {
		throw new Error('Cart not found')
	}

	if (userCart?.totalAmount === 0) {
		throw new Error('Cart is empty')
	}

	return { cartToken, userCart }
}
