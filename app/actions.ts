'use server'

import { prisma } from '@/prisma/prisma-client'
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components'
import { CheckoutFormValues } from '@/shared/constants'
import { createPayment, sendEmail } from '@/shared/lib'
import { EnumCurrency } from '@/shared/lib/dto/liqpay.dto'
import { getCartFromCookies } from '@/shared/lib/get-cart-from-cookies'
import { getUserSession } from '@/shared/lib/get-user-session'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormValues) {
	try {
		const { userCart } = await getCartFromCookies()

		const cookieStore = cookies()
		const orderId = cookieStore.get('orderId')?.value

		if (!orderId) {
			throw new Error('Order id not found')
		}

		const order = await prisma.order.findUnique({
			where: {
				id: Number(orderId),
			},
		})

		if (!order) {
			throw new Error('Order not found')
		}

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		await sendEmail(
			data.email,
			`Next Pizza | Оплатите заказ #${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: 'https://resend.com/docs/send-with-nextjs',
			})
		)
	} catch (err) {
		console.log('[CreateOrder] Server error', err)
	}
}

export async function prepareCreatingOrder(data: CheckoutFormValues) {
	try {
		const { userCart, cartToken } = await getCartFromCookies()
		const user = await getUserSession()

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				userId: Number(user?.id) || null,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment || '',
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		})

		const cookieStore = cookies()
		cookieStore.set('orderId', order.id.toString())

		const { data: paymentData, signature: paymentSignature } = createPayment({
			price: order.totalAmount,
			currency: EnumCurrency.UAH,
			description: `Заказ #${order.id} на суму ${order.totalAmount} грн`,
			orderId: order.id.toString(),
		})

		return {
			paymentData,
			paymentSignature,
			orderId: order.id,
		}
	} catch (error) {
		console.log('[GetPaymentInfo] Server error', error)
	}
}

export async function deleteOrderById(id: number) {
	try {
		await prisma.order.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.log('[DeleteOrderById] Server error', error)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('User not found')
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		})
	} catch (error) {
		console.log('[UpdateUserInfo] Server error', error)
		throw error
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			if (!user.verified) {
				throw new Error("Email don't verified")
			}

			throw new Error('User already exists')
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString()

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		})

		await sendEmail(
			createdUser.email,
			`Next Pizza | Подтверждение регистрации`,
			VerificationUserTemplate({
				code,
			})
		)
	} catch (error) {
		console.log('Error [CREATE_USER', error)
		throw error
	}
}
