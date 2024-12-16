import * as React from 'react'

interface IProps {
	orderId: number
	totalAmount: number
	paymentUrl: string
}

export const PayOrderTemplate: React.FC<Readonly<IProps>> = ({
	orderId,
	totalAmount,
	paymentUrl,
}) => (
	<div>
		<h1>Заказ #{orderId}</h1>

		<p>
			Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите по{' '}
			<a href={paymentUrl}>этой ссылке</a> для оплаты заказа.
		</p>
	</div>
)
