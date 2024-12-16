import crypto from 'crypto'

import { EnumPaymentStatus, TypeHandleOptions } from '../dto/liqpay.dto'

type TypeResult = {
	status: boolean
	orderId: number | null
	amount: number | null
}

export async function handlePaymentStatus(options: TypeHandleOptions) {
	const { data, signature } = options
	let result: TypeResult = {
		status: false,
		orderId: null,
		amount: null,
	}

	const hash = crypto.createHash('sha1')
	const correctSignature = hash
		.update(
			process.env.PRIVATE_LIQPAY_KEY + data + process.env.PRIVATE_LIQPAY_KEY
		)
		.digest('base64')

	const isValidSignature = signature === correctSignature

	if (!isValidSignature) {
		return result
	}

	const decodedData = JSON.parse(
		Buffer.from(data, 'base64').toString()
	) as Record<string, string>
	const { status, order_id, amount } = decodedData

	if (
		status !== EnumPaymentStatus.success &&
		status !== EnumPaymentStatus.sandbox
	) {
		return result
	}

	result = {
		status: true,
		orderId: Number(order_id),
		amount: Number(amount),
	}

	return result
}
