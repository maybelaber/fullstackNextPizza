import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { getCartItemDetails } from '@/shared/lib'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import React from 'react'
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..'

interface IProps {
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void
	loading?: boolean
	removeCartItem: (id: number) => void
	className?: string
}

export const CheckoutCart: React.FC<IProps> = ({
	items,
	loading,
	onClickCountButton,
	removeCartItem,
	className,
}) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{loading
					? [...Array(4)].map((_, index) => (
							<CheckoutItemSkeleton key={index} />
					  ))
					: items.map(item => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	)
}
