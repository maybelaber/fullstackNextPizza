import { Order } from '@prisma/client'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Order[]> => {
	const { data } = await axiosInstance.get<Order[]>(ApiRoutes.ORDERS)

	return data
}
