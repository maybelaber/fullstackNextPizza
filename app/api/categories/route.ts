import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export async function GET(req: NextRequest) {
	try {
		const params = req.nextUrl.searchParams

		const sizes = params.get('sizes')?.split(',').map(Number)
		const pizzaTypes = params.get('pizzaTypes')?.split(',').map(Number)
		const ingredientsIdArr = params.get('ingredients')?.split(',').map(Number)
		console.log('ingredientsIdArr', ingredientsIdArr)

		const minPrice = Number(params.get('priceFrom')) || DEFAULT_MIN_PRICE
		const maxPrice = Number(params.get('priceTo')) || DEFAULT_MAX_PRICE

		const categories = await prisma.category.findMany({
			include: {
				products: {
					orderBy: {
						id: 'desc',
					},
					where: {
						ingredients: ingredientsIdArr
							? {
									some: {
										id: {
											in: ingredientsIdArr,
										},
									},
							  }
							: undefined,

						items: {
							some: {
								size: {
									in: sizes,
								},
								pizzaType: {
									in: pizzaTypes,
								},
								price: {
									gte: minPrice,
									lte: maxPrice,
								},
							},
						},
					},

					include: {
						ingredients: true,
						items: {
							where: {
								price: {
									gte: minPrice,
									lte: maxPrice,
								},
							},
							orderBy: {
								price: 'desc',
							},
						},
					},
				},
			},
		})

		const sortedProducts = categories.map(category => {
			return {
				...category,
				products: category.products.sort((firstItem, secondItem) => {
					switch (params.get('sortBy')) {
						case 'alphabet':
							return firstItem.name.localeCompare(secondItem.name)
						case 'price':
							return firstItem.items[0].price - secondItem.items[0].price
						default:
							return firstItem.id - secondItem.id
					}
				}),
			}
		})

		return NextResponse.json(sortedProducts)
	} catch (error) {
		console.log('[CATEGORIES_GET] Server error', error)
		return NextResponse.json(
			{ message: '[CATEGORIES_GET] Server error' },
			{ status: 500 }
		)
	}
}
