import { prisma } from '@/prisma/prisma-client'
import { OrderSuccessTemplate } from '@/shared/components'
import { handlePaymentStatus, sendEmail } from '@/shared/lib'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const paramsText = await req.text()
		let [signature, data] = decodeURIComponent(paramsText).split('&')

		signature = signature.replace('signature=', '')
		data = data.replace('data=', '')

		const paymentResultData = await handlePaymentStatus({ data, signature })

		if (!paymentResultData.status) {
			throw new Error('Access is denied')
		}

		const order = await prisma.order.findUnique({
			where: {
				id: paymentResultData.orderId || undefined,
			},
		})

		if (!order) {
			throw new Error('Order not found')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: OrderStatus.SUCCEEDED,
			},
		})

		if (!paymentResultData.status) {
			throw new Error('Payment failed to process')
		}

		const items = JSON.parse(
			order.items?.toLocaleString() || '[]'
		) as CartItemDTO[]

		await sendEmail(
			order.email,
			'Next Pizza / Ваш заказ успешно оформлен',
			OrderSuccessTemplate({ orderId: order.id, items })
		)

		return NextResponse.json({ paymentResultData })
	} catch (error) {
		console.log('[PAYMENT_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Payment failed to process' },
			{ status: 500 }
		)
	}
}
