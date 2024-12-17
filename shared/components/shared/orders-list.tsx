import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Order } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { Accordion, OrderItem, Skeleton, Title } from '..'

interface IProps {
	className?: string
}

export const OrdersList: React.FC<IProps> = ({ className }) => {
	const [orders, setOrders] = React.useState<Order[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchAllOrders() {
			try {
				setLoading(true)
				const orders = await Api.orders.getAll()
				setOrders(orders)
				setLoading(false)
			} catch (err) {
				console.error(err)
				toast.error('Не удалось получить заказы')
			}
		}

		fetchAllOrders()
	}, [])

	if (loading) {
		return (
			<Accordion
				type='multiple'
				className={cn('flex flex-col gap-6', className)}
			>
				{[...Array(3)].map((_, index) => (
					<Skeleton key={index} className='w-[750px] h-[100px]' />
				))}
			</Accordion>
		)
	}

	return (
		<Accordion type='multiple' className={cn('flex flex-col gap-6', className)}>
			{orders.length === 0 ? (
				<div className='flex flex-col items-center max-w-[600px]'>
					<Image
						src='/assets/images/empty-box.png'
						alt='Empty cart'
						width={120}
						height={120}
					/>
					<Title
						size='sm'
						text='Заказов нет'
						className='text-center font-bold my-2'
					/>
					<p className='text-center text-neutral-500 mb-5'>
						Сделайте свой первый заказ и он отобразится здесь!
					</p>
				</div>
			) : (
				orders.map(order => <OrderItem key={order.id} order={order} />)
			)}
		</Accordion>
	)
}
