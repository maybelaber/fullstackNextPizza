import type { Category, Ingredient, Product, ProductItem } from '@prisma/client'

export interface ProductWithRelations extends Product {
	items: ProductItem[]
	ingredients: Ingredient[]
}

export interface ProductsWithRelations extends Product {
	ingredients: Ingredient[]
	items: ProductItem[]
}

export interface CategoryWithRelations extends Category {
	products: ProductsWithRelations[]
}
