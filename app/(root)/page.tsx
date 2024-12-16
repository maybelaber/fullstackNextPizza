'use client'

import { CategoryWithRelations } from '@/@types/prisma'
import {
	Categories,
	Container,
	ProductsBlock,
	SortPopup,
	Stories,
	Title,
} from '@/shared/components/shared'
import { Api } from '@/shared/services/api-client'
import { GetSearchParams } from '@/shared/services/dto/categories.dto'
import React from 'react'
import toast from 'react-hot-toast'

export default function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const [categories, setCategories] = React.useState<CategoryWithRelations[]>(
		[]
	)

	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(false)

	React.useEffect(() => {
		async function findProductsBySearchParams() {
			try {
				setLoading(true)
				const categories = await Api.categories.getFilteredCategories(
					searchParams
				)
				setCategories(categories)
				setLoading(false)
			} catch (error) {
				setLoading(false)
				setError(true)

				console.error('Filter error', error)
				toast.error('Не удалось найти продукты')
			}
		}

		findProductsBySearchParams()
	}, [searchParams])

	return (
		<>
			<Container className='mt-5'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<div className='shadow-md sticky top-0 z-10'>
				<Container className='flex justify-between mb-10 border-b-solid py-6 bg-white'>
					<Categories
						items={categories.filter(category => category.products.length > 0)}
						loading={loading}
					/>
					<SortPopup />
				</Container>
			</div>

			<Stories />

			<ProductsBlock categories={categories} loading={loading} error={error} />
		</>
	)
}
