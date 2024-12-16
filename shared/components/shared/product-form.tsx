'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm } from '.'

interface IProps {
	product: ProductWithRelations
	onSubmit?: VoidFunction
	className?: string
}

export const ProductForm: React.FC<IProps> = ({
	product,
	className,
	onSubmit: _onSubmit,
}) => {
	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	])

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(product.items[0].pizzaType)

	const onSubmit = async (
		productItemId?: number,
		ingredientsIds?: number[]
	) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredientsIds,
			})

			toast.success(`${product.name} was added to cart`)
			_onSubmit?.()
		} catch (err) {
			toast.error('An error occurred while adding item to cart')
			console.error(err)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
				className={className}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			price={firstItem.price}
			onSubmit={onSubmit}
			loading={loading}
			className={className}
		/>
	)
}
