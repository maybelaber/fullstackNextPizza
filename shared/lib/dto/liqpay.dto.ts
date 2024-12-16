export enum EnumCurrency {
	UAH = 'UAH',
	USD = 'USD',
	EUR = 'EUR',
}

export enum EnumPaymentStatus {
	error = 'error',
	failure = 'failure',
	reversed = 'reversed',
	success = 'success',
	sandbox = 'sandbox',
}

export interface IPaymentParams {
	price: number
	currency: EnumCurrency
	description: string
	orderId: string
}

export type TypeHandleOptions = {
	data: string
	signature: string
}
