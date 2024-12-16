import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import React from 'react'
import { PaymentButton } from '..'
import { Button, Dialog, DialogContent } from '../..'

interface IProps {
	className?: string
	open: boolean
	stopPaymentProcess?: VoidFunction
	onClickConfirmPayment?: VoidFunction
}

export const ConfirmPaymentModal: React.FC<IProps> = ({
	className,
	open,
	stopPaymentProcess,
	onClickConfirmPayment,
}) => {
	return (
		<Dialog open={open} onOpenChange={stopPaymentProcess}>
			<DialogContent
				className={cn('px-6 py-10 bg-white overflow-hidden', className)}
			>
				<div className=''>
					<p
						className='text-lg text-center
					font-bold'
					>
						Вы уверены, что хотите перейти к оплате?
					</p>

					<PaymentButton onClickConfirmPayment={onClickConfirmPayment} />

					<Button
						onClick={stopPaymentProcess}
						type='submit'
						className='w-full h-14 rounded-2xl mt-3 text-base font-bold border border-gray-300'
						variant={'secondary'}
					>
						Отмена
						<X className='w-5 ml-2' />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
