import { cn } from '@/shared/lib/utils'
import React from 'react'

interface IProps {
	className?: string
}

export const CategoriesError: React.FC<IProps> = ({ className }) => {
	return (
		<div className={cn(className, 'text-3xl font-bold')}>
			<p className='text-center mb-3'>🙁</p>
			<p className='text-center'>
				Произошла ошибка. <br />
				Подробная информация в консоли.
			</p>
		</div>
	)
}
