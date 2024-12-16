'use client'
import { ProductWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { ProductCard, Title } from '.'

interface IProps {
	title: string
	items: ProductWithRelations[]
	categoryId: number
	listClassName?: string
	loading?: boolean
	className?: string
}

export const ProductsGroupList: React.FC<IProps> = ({
	title,
	items,
	listClassName,
	categoryId,
	loading,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)

	const intersectionRef = useRef<HTMLDivElement>(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [intersection?.isIntersecting])

	return (
		<div
			className={cn('scroll-mt-[110px]', className)}
			id={title}
			ref={intersectionRef}
		>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items
					.filter(product => product.items.length > 0)
					.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							price={product.items[0].price}
							ingredients={product.ingredients}
						/>
					))}
			</div>
		</div>
	)
}
