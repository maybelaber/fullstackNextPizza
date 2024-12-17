import { cn } from '@/shared/lib/utils'
import React from 'react'
import { OrdersList, Title } from '.'

interface IProps {
	className?: string
}

export const OrdersComponent: React.FC<IProps> = ({ className }) => {
	return (
		<div>
			<Title
				text={`Заказы`}
				size='md'
				className={cn(className, 'font-bold mb-3')}
			/>

			<OrdersList />
		</div>
	)
}
