import { useEffect } from 'react'
import { useCartStore } from '../store'

export const useInitializeCart = () => {
	const { fetchCartItems } = useCartStore(state => state)

	useEffect(() => {
		fetchCartItems()
	}, [])
}
