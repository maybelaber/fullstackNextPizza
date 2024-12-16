import { calcCartItemTotalPrice } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import { Order } from '@prisma/client'
import React from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	OrderDescription,
	OrderItemStatus,
	Title,
} from '..'

interface IProps {
	className?: string
	order: Order
}

export const OrderItem: React.FC<IProps> = ({ className, order }) => {
	const orderItems = JSON.parse(order.items as string) as CartItemDTO[]

	const date = new Date(order.createdAt)
	const formattedDate = date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})

	return (
		<AccordionItem
			value={`item-${order.id}`}
			className={cn(className, 'max-w-[750px] bg-[#f3f3f3] rounded-[30px] p-8')}
		>
			<AccordionTrigger className='flex items-center p-0  hover:no-underline'>
				<Title
					text={`Заказ #${order.id}`}
					size='sm'
					className='font-bold mr-5'
				/>
				<div className='text-base text-gray-400 mr-auto'>{formattedDate}</div>
				<OrderItemStatus status={order.status} />
			</AccordionTrigger>

			<AccordionContent className='border-t mt-6 p-0'>
				{orderItems.map(item => (
					<div key={item.id} className='flex items-center gap-5 py-5 border-b'>
						<img
							src={item.productItem.product.imageUrl}
							alt={item.productItem.product.name}
							width={65}
							height={65}
						/>
						<div className='mr-auto'>
							<Title
								text={item.productItem.product.name}
								size='sm'
								className='font-bold mb-1'
							/>
							<div className='text-sm text-gray-400'>
								<OrderDescription
									size={item.productItem.size as 20 | 30 | 40}
									type={item.productItem.pizzaType as 1 | 2}
									ingredients={item.ingredients}
								/>
							</div>
						</div>

						<div className='shrink-0'>
							<div className='font-bold text-base'>
								{calcCartItemTotalPrice(item)} ₽
							</div>
							<div className='text-sm text-gray-400 text-right'>
								{item.quantity} шт.
							</div>
						</div>
					</div>
				))}

				<div className='font-semibold text-xl mt-5'>
					Итого: <span className='font-bold'>{order.totalAmount} ₽</span>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
