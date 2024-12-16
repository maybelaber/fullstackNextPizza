import crypto from 'crypto'

import { IPaymentParams } from '../dto/liqpay.dto'

export function createPayment(details: IPaymentParams) {
	const jsonString = JSON.stringify({
		version: 3,
		public_key: process.env.PUBLIC_LIQPAY_KEY,
		action: 'pay',
		amount: details.price,
		currency: 'UAH',
		description: details.description,
		order_id: details.orderId,
		server_url: process.env.REDIRECT_SERVER_URL + '/api/payment',
		result_url: process.env.SERVER_URL + '/?paid',
		sandbox: 1,
	})

	const data = Buffer.from(jsonString).toString('base64')

	const hash = crypto.createHash('sha1')
	const signature = hash
		.update(
			process.env.PRIVATE_LIQPAY_KEY + data + process.env.PRIVATE_LIQPAY_KEY
		)
		.digest('base64')

	console.log(data)
	console.log(signature)

	return {
		data,
		signature,
	}
}
