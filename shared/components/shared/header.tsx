'use client'

import { useInitializeCart } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { usePaymentStore } from '@/shared/store/payment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { CartButton, Container, ProfileButton, SearchInput } from './index'
import { AuthModal } from './modals/auth-modal'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	useInitializeCart()

	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const { requestData } = usePaymentStore()

	React.useEffect(() => {
		console.log(requestData)
	}, [requestData])

	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
		}
		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])

	return (
		<header className={cn('border-b border-gray-100', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex gap-2'>
						<Image
							className='self-center'
							src='/logo.png'
							alt='Logo'
							width={32}
							height={32}
						/>
						<div>
							<h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-2'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
