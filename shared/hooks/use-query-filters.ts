'use client'

import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect, useRef } from 'react'
import { IFilters } from './use-filters'

export const useQueryFilters = (filters: IFilters) => {
	const isMounted = useRef(false)
	const router = useRouter()

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				...filters.prices,
				pizzaTypes: Array.from(filters.pizzaTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedIngredients),
				sortBy: filters.sortBy,
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			})

			router.push(`?${query}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [filters])
}
