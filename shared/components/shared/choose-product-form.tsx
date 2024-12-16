import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from '.'
import { Button } from '../ui'

interface IProps {
	name: string
	imageUrl: string
	loading?: boolean
	price?: number
	className?: string
	onSubmit?: VoidFunction
}

export const ChooseProductForm: React.FC<IProps> = ({
	name,
	imageUrl,
	loading,
	price,
	onSubmit,
	className,
}) => {
	return (
		<div className={cn(className, 'flex flex-1')}>
			<div className='flex items-center justify-center flex-1 relative w-full'>
				<img
					src={imageUrl}
					alt={name}
					className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
				/>
			</div>

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	)
}
