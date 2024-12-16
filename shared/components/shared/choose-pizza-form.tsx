'use client'

import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { usePizzaOptions } from '@/shared/hooks'
import { getPizzaDetails } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Ingredient, ProductItem } from '@prisma/client'
import React, { useEffect } from 'react'
import { GroupVariants, PizzaImage, Title } from '.'
import { Button } from '../ui'
import { IngredientItem } from './ingredient-item'

interface IProps {
	imageUrl: string
	name: string
	items: ProductItem[]
	ingredients: Ingredient[]
	loading?: boolean
	className?: string
	onSubmit: (itemId: number, ingredients: number[]) => void
}

export const ChoosePizzaForm: React.FC<IProps> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	className,
	onSubmit,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availablePizzaSizes,
		currentItemId,
		setSize,
		setType,
		toggleIngredient,
	} = usePizzaOptions(items)

	const toggle = (id: number) => {
		toggleIngredient(id)
	}

	useEffect(() => {
		console.log('selectedIngredients', selectedIngredients)
	}, [selectedIngredients])

	const { totalPrice, textDetails } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-2'>
					<GroupVariants
						items={availablePizzaSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>
					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map(ingredient => (
							<IngredientItem
								onClick={() => toggle(ingredient.id)}
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-auto flex'
					onClick={handleClickAdd}
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}
