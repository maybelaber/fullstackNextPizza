import { create } from 'zustand'

interface State {
	loading: boolean
	error: boolean
	setLoading: (loading: boolean) => void
	setError: (error: boolean) => void
}

export const useItemsStore = create<State>(set => ({
	loading: true,
	error: false,
	setLoading: (loading: boolean) => set({ loading }),
	setError: (error: boolean) => set({ error }),
}))
