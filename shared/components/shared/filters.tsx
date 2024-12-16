'use client'

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import React from 'react'
import { CheckboxFilterGroup, RangeSlider } from '.'
import { Input } from '../ui'
import { Title } from './title'

interface IProps {
	className?: string
}

export const Filters: React.FC<IProps> = ({ className }) => {
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryFilters(filters)

	const filteredIngredients = ingredients.map(ingredient => ({
		text: ingredient.name,
		value: String(ingredient.id),
	}))

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<CheckboxFilterGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mb-5'
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckboxFilterGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={0}
						max={1000}
						placeholder='1000'
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
			</div>

			<RangeSlider
				min={0}
				max={1000}
				step={10}
				value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
				onValueChange={updatePrices}
			/>

			<CheckboxFilterGroup
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				defaultItems={filteredIngredients.slice(0, 6)}
				items={filteredIngredients}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
				name='ingredients'
			/>
		</div>
	)
}
