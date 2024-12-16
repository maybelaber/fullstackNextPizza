'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { Dialog, DialogContent } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ProductForm } from '..'

interface IProps {
	className?: string
	product: ProductWithRelations
}

export const ChooseProductModal: React.FC<IProps> = ({
	className,
	product,
}) => {
	const router = useRouter()

	const [open, setOpen] = React.useState(true)

	const onChange = () => {
		setOpen(prev => !prev)

		router.back()
	}

	return (
		<Dialog open={open} onOpenChange={onChange}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				<ProductForm product={product} onSubmit={onChange} />
			</DialogContent>
		</Dialog>
	)
}
