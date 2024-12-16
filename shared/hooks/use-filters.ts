'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSet } from 'react-use'

type TypePriceProps = {
	priceFrom?: number
	priceTo?: number
}
interface IQueryFilters extends TypePriceProps {
	pizzaTypes: string
	sizes: string
	ingredients: string
	sortBy?: string
}

export interface IFilters {
	sizes: Set<string>
	pizzaTypes: Set<string>
	selectedIngredients: Set<string>
	prices: TypePriceProps
	sortBy?: string
}

interface IReturnProps extends IFilters {
	setPrices: (name: keyof TypePriceProps, value: number) => void
	setPizzaTypes: (value: string) => void
	setSizes: (value: string) => void
	setSelectedIngredients: (value: string) => void
	setSortBy: (value: string) => void
}

export const useFilters = (values: string[] = []): IReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof IQueryFilters,
		string
	>

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(values)
	)

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(','))
	)
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	)

	const [prices, setPrices] = useState<TypePriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const [sortBy, setSortBy] = useState<string | undefined>(
		searchParams.get('sortBy') || undefined
	)

	const updatePrice = (name: keyof TypePriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const filters = {
		...prices,
		pizzaTypes: Array.from(pizzaTypes),
		sizes: Array.from(sizes),
		ingredients: Array.from(selectedIngredients),
	}

	return React.useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			sortBy,
			setSizes: toggleSizes,
			setPizzaTypes: togglePizzaTypes,
			setSelectedIngredients: toggleIngredients,
			setPrices: updatePrice,
			setSortBy,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices, sortBy]
	)
}
