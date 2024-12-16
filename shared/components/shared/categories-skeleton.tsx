import React from 'react'
import { Skeleton } from '..'

interface IProps {
	className?: string
}

export const CategoriesSkeleton: React.FC<IProps> = ({ className }) => {
	return (
		<div className={className}>
			<Skeleton className='w-[950px] h-[48px] mb-10' />
			<div className='grid grid-cols-3 gap-[50px]'>
				{[...Array(3)].map((_, index) => (
					<Skeleton key={index} className='w-[283px] h-[425px]' />
				))}
			</div>
		</div>
	)
}
