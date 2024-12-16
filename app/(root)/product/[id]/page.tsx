import { prisma } from '@/prisma/prisma-client'
import { Container, ProductForm } from '@/shared/components/shared'
import { notFound } from 'next/dist/client/components/not-found'
import React from 'react'

interface IProps {
	params: { id: string }
}

const ProductModal: React.FC<IProps> = async ({ params: { id } }) => {
	if (Number.isNaN(Number(id))) {
		return notFound()
	}

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	})

	if (!product) {
		return notFound()
	}

	return (
		<Container className='flex flex-col my-10'>
			<ProductForm product={product} />
		</Container>
	)
}

export default ProductModal
