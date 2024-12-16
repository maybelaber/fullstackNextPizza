import { CategoryWithRelations } from '@/@types/prisma'
import { ApiRoutes } from './constants'
import { GetSearchParams } from './dto/categories.dto'
import { axiosInstance } from './instance'

export const getFilteredCategories = async (
	params: GetSearchParams
): Promise<CategoryWithRelations[]> => {
	const { data } = await axiosInstance.get<CategoryWithRelations[]>(
		ApiRoutes.CATEGORIES,
		{
			params,
		}
	)

	return data
}
