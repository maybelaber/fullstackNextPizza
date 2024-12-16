'use client'

import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Order } from '@prisma/client'
import React from 'react'
import toast from 'react-hot-toast'
import { OrderItem, Title } from '.'
import { Accordion, Skeleton } from '..'

interface IProps {
	className?: string
}

export const OrdersComponent: React.FC<IProps> = ({ className }) => {
	const [orders, setOrders] = React.useState<Order[]>([])

	React.useEffect(() => {
		async function fetchAllOrders() {
			try {
				const orders = await Api.orders.getAll()
				setOrders(orders)
			} catch (err) {
				console.error(err)
				toast.error('Не удалось получить заказы')
			}
		}

		fetchAllOrders()
	}, [])

	return (
		<div>
			<Title
				text={`Заказы`}
				size='md'
				className={cn(className, 'font-bold mb-3')}
			/>

			<Accordion type='multiple' className='flex flex-col gap-6'>
				{orders.length === 0
					? [...Array(3)].map((_, index) => (
							<Skeleton key={index} className='w-[750px] h-[100px]' />
					  ))
					: orders.map(order => <OrderItem key={order.id} order={order} />)}
			</Accordion>
		</div>
	)
}
