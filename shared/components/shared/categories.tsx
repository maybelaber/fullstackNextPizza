'use client'

import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { Category } from '@prisma/client'
import React from 'react'
import { Skeleton } from '..'

interface Props {
	items: Category[]
	loading?: boolean
	className?: string
}

export const Categories: React.FC<Props> = ({ items, className, loading }) => {
	const activeCategoryId = useCategoryStore(state => state.activeId)

	if (loading) return <Skeleton className='w-[562px] h-[52px]' />

	return (
		<ul
			className={cn('inline-flex gap-2 bg-gray-50 p-1 rounded-2xl', className)}
		>
			{items.map(({ name, id }) => (
				<li key={id}>
					<a
						href={`/#${name}`}
						className={cn(
							'flex items-center font-bold h-11 rounded-2xl px-5',
							activeCategoryId === id &&
								'bg-white shadow-md shadow-gray-200 text-primary'
						)}
					>
						{name}
					</a>
				</li>
			))}
		</ul>
	)
}
