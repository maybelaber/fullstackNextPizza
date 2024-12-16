import { prisma } from '@/prisma/prisma-client'
import { ChooseProductModal } from '@/shared/components/shared'
import { notFound } from 'next/navigation'

interface IProps {
	params: { id: string }
}

export default async function ProductModalPage({ params: { id } }: IProps) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			items: true,
		},
	})

	if (!product) return notFound()

	return <ChooseProductModal product={product} />
}
