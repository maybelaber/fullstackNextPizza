'use client'
import { cn } from '@/shared/lib/utils'
import { useCartStore } from '@/shared/store'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import React from 'react'
import { CartDrawer } from '.'
import { Button } from '../ui'

interface IProps {
	className?: string
	value?: number
	onClick?: (type: 'plus' | 'minus') => void
}

export const CartButton: React.FC<IProps> = ({ className, value, onClick }) => {
	const [totalAmount, items, loading] = useCartStore(state => [
		state.totalAmount,
		state.items,
		state.loading,
	])

	const itemsNumber = items.reduce((acc, item) => acc + item.quantity, 0)

	const onButtonClick = () => {
		onClick?.(itemsNumber > 0 ? 'minus' : 'plus')
	}

	return (
		<CartDrawer>
			<Button
				loading={loading}
				onClick={onButtonClick}
				className={cn('group relative', { 'w-[105px]': loading }, className)}
			>
				<b>{totalAmount} ₽</b>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart size={16} className='relative' strokeWidth={2} />
					<b>{itemsNumber}</b>
				</div>
				<ArrowRight
					size={20}
					className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
				/>
			</Button>
		</CartDrawer>
	)
}
