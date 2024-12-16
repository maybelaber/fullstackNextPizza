import { useSet } from 'react-use'

interface ReturnProps {
	selectedIngredients: Set<string>
	onAddId: (id: string) => void
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
	const [selectedIngredients, { toggle }] = useSet(new Set<string>(values))

	return {
		onAddId: toggle,
		selectedIngredients,
	}
}
