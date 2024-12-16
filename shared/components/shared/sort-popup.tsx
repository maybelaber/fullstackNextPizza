'use client'

import { useFilters, useQueryFilters } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

interface ISortItems {
	name: string
	value: string
}

interface Props {
	className?: string
}

const sortItems: ISortItems[] = [
	{ name: 'по умолчанию', value: 'default' },
	{ name: 'цене', value: 'price' },
	{ name: 'алфавиту', value: 'alphabet' },
]

export const SortPopup: React.FC<Props> = ({ className }) => {
	const [open, setOpen] = React.useState(false)

	const filters = useFilters()
	useQueryFilters(filters)

	const defaultValue = sortItems.find(item => item.value === 'default')

	const currentName =
		sortItems.find(item => item.value === filters.sortBy)?.name ||
		defaultValue?.name

	const onClickOption = (index: number) => {
		filters.setSortBy(sortItems[index].value)

		setOpen(false)
	}

	React.useEffect(() => {
		const onClickOutsideModal = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest('#sort-modal')) {
				console.log('close')
				setOpen(false)
			}
		}

		const body = document.querySelector('body')
		body?.addEventListener('click', onClickOutsideModal)

		return () => {
			body?.removeEventListener('click', onClickOutsideModal)
		}
	}, [])

	return (
		<div className='relative' id='sort-modal'>
			<div
				className={cn(
					'inline-flex items-center justify-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer min-w-[300px]',
					className
				)}
				onClick={() => setOpen(prev => !prev)}
			>
				<ArrowUpDown size={16} />
				<b>Сортировка:</b>
				<b className='text-primary'>{currentName}</b>
			</div>

			<ul
				className={cn(
					'absolute bottom-0 translate-y-[100%] left-0 w-full bg-[#f9fafc] rounded-2xl overflow-hidden',
					{ hidden: !open }
				)}
			>
				{sortItems.map((item, index) => (
					<li key={index}>
						<button
							className='px-2 py-1 w-full hover:bg-gray-100'
							onClick={() => onClickOption(index)}
						>
							{item.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
