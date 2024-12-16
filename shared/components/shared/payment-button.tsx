import { usePaymentStore } from '@/shared/store/payment'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '..'

interface IProps {
	className?: string
	onClickConfirmPayment?: VoidFunction
}

const LIQPAY_API_URL = 'https://www.liqpay.ua/api/3/checkout'

export const PaymentButton: React.FC<IProps> = ({
	className,
	onClickConfirmPayment,
}) => {
	const { paymentData, paymentSignature } = usePaymentStore()

	return (
		<form
			className={className}
			method='POST'
			action={LIQPAY_API_URL}
			accept-charset='utf-8'
		>
			<input type='hidden' name='data' value={paymentData} />
			<input type='hidden' name='signature' value={paymentSignature} />

			<Button
				onClick={onClickConfirmPayment}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
			>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</form>
	)
}
