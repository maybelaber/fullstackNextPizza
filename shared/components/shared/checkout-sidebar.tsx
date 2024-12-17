import { DELIVERY_PRICE } from '@/shared/lib/get-cart-details'
import { cn } from '@/shared/lib/utils'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import React from 'react'
import { CheckoutItemDetails, WhiteBlock } from '.'
import { Button, Skeleton } from '../ui'

interface IProps {
	className?: string
	loading?: boolean
	totalAmountWithFees: number
	totalAmount: number
	vatPrice: number
}

export const CheckoutSidebar: React.FC<IProps> = ({
	totalAmountWithFees,
	totalAmount,
	vatPrice,
	loading,
	className,
}) => {
	return (
		<WhiteBlock className={cn(className, 'p-6 sticky top-4')}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='w-[160px] h-[43px]' />
				) : (
					<span className='h-11 text-[34px] font-extrabold'>
						{totalAmountWithFees} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-400' /> Стоимость
						корзины:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='w-14 h-6 rounded-[6px]' />
					) : (
						`${totalAmount} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-400' /> Налоги:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='w-14 h-6 rounded-[6px]' />
					) : (
						`${vatPrice} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-400' /> Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='w-14 h-6 rounded-[6px]' />
					) : (
						`${DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				loading={loading}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
			>
				Продолжить
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</WhiteBlock>
	)
}
