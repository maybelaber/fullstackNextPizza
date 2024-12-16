import { cn } from '@/shared/lib/utils'
import React from 'react'

interface IProps {
	className?: string
	status?: 'SUCCEEDED' | 'PENDING' | 'CANCELLED'
}

export const OrderItemStatus: React.FC<IProps> = ({
	className,
	status = 'succeeded',
}) => {
	let statusText = ''

	switch (status) {
		case 'SUCCEEDED':
			statusText = 'Оплачено'
			break
		case 'PENDING':
			statusText = 'В ожидании'
			break
		case 'CANCELLED':
			statusText = 'Отклонено'
			break
	}

	return (
		<div
			className={cn(className, {
				'bg-[#eaf8f4] p-2 rounded-2xl text-[#1bb486] font-semibold text-sm mr-8':
					status === 'SUCCEEDED',
				'bg-[#fff3b4] p-2 rounded-2xl text-[#917c12] font-semibold text-sm mr-8':
					status === 'PENDING',
				'bg-[#FFF0EF] p-2 rounded-2xl text-[#ff544a] font-semibold text-sm mr-8':
					status === 'CANCELLED',
			})}
		>
			{statusText}
		</div>
	)
}
