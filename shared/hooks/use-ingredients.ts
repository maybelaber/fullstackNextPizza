'use client'

import { Api } from '@/shared/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ReturnProps {
	ingredients: Ingredient[]
	loading: boolean
}

export const useIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchIngredients() {
			try {
				const ingredients = await Api.ingredients.getAll()
				setIngredients(ingredients)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchIngredients()
	}, [])

	return { ingredients, loading }
}
