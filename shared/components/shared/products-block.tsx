'use client'

import { CategoryWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import React, { Suspense } from 'react'
import { CategoriesSkeleton, Container, Filters, ProductsGroupList } from '.'
import { CategoriesError } from './categories-error'

interface IProps {
	className?: string
	categories: CategoryWithRelations[]
	loading?: boolean
	error?: boolean
}

export const ProductsBlock: React.FC<IProps> = ({
	className,
	categories,
	loading,
	error,
}) => {
	return (
		<Container className={cn(className, 'mt-5')}>
			<div className='flex gap-[80px]'>
				<div className='w-[250px]'>
					<Suspense>
						<Filters />
					</Suspense>
				</div>

				{error ? (
					<CategoriesError className='flex-1' />
				) : (
					<div className='flex-1'>
						{loading ? (
							[...Array(3)].map((_, index) => (
								<CategoriesSkeleton className='mb-12 last:mb-0' key={index} />
							))
						) : (
							<div className='flex flex-col gap-16'>
								{categories.map(
									category =>
										category.products.length > 0 && (
											<ProductsGroupList
												key={category.id}
												categoryId={category.id}
												title={category.name}
												items={category.products}
												loading={loading}
											/>
										)
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</Container>
	)
}
