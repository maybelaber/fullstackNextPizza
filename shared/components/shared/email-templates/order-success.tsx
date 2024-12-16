import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import React from 'react'

interface IProps {
	orderId: number
	items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<Readonly<IProps>> = ({
	orderId,
	items,
}) => (
	<div>
		<h1>Спасибо за покупку!!!🥳🥳</h1>

		<p>Ваш заказ #${orderId} оплачен. Список товаров:</p>

		<ul>
			{items.map(item => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} ₽ x{' '}
					{item.quantity} шт. ={' '}
					{(item.productItem.price +
						item.ingredients.reduce(
							(acc, ingredient) => acc + ingredient.price,
							0
						)) *
						item.quantity}{' '}
					₽
				</li>
			))}
		</ul>
	</div>
)
