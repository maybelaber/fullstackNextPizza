'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import {
	createOrder,
	deleteOrderById,
	prepareCreatingOrder,
} from '@/app/actions'
import { Button } from '@/shared/components'
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	ConfirmPaymentModal,
	Container,
	Title,
} from '@/shared/components/shared'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import { Api } from '@/shared/services/api-client'
import { useCartStore } from '@/shared/store'
import { usePaymentStore } from '@/shared/store/payment'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false)
	const [currentOrderId, setCurrentOrderId] = React.useState<number | null>(
		null
	)

	const router = useRouter()

	const {
		totalAmountWithFees,
		totalAmount,
		vatPrice,
		items,
		updateItemQuantity,
		removeCartItem,
		loading,
	} = useCartStore()

	const {
		setPaymentData,
		setPaymentSignature,
		setStatus,
		setFormData,
		status,
		formData,
	} = usePaymentStore()
	const { data: session } = useSession()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: session?.user.name || '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			console.log('data', data)
			const [firstName, lastName] = data?.fullName.split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', data.email)
		}

		if (session) {
			fetchUserInfo()
		}
	}, [session, form])

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	const stopPaymentProcess = () => {
		setStatus(false)
		setSubmitting(false)
		if (currentOrderId) {
			deleteOrderById(currentOrderId)
		}
	}

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)

			const paymentInfo = await prepareCreatingOrder(data)

			if (!paymentInfo) {
				throw new Error('Failed to create order')
			}

			setPaymentData(paymentInfo.paymentData)
			setPaymentSignature(paymentInfo.paymentSignature)
			setCurrentOrderId(paymentInfo.orderId)
			setFormData(data)

			setStatus(true)
		} catch (err) {
			console.error(err)
			setSubmitting(false)
			toast.error('Не удалось создать заказ')
		}
	}

	const onClickConfirmPayment = async () => {
		try {
			setSubmitting(true)

			if (formData) {
				await createOrder(formData)
			}

			setStatus(true)

			toast.success('Заказ успешно создан! Переход на оплату...')
		} catch (err) {
			console.error(err)
			setSubmitting(false)
			toast.error('Не удалось создать заказ')
		}
	}

	return (
		<Container className='pt-6'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>

			{items.length > 0 ? (
				<>
					<FormProvider {...form}>
						<form
							method='POST'
							onSubmit={form.handleSubmit(onSubmit)}
							acceptCharset='UTF-8'
						>
							<div className='flex gap-10'>
								<div className='flex flex-col gap-10 flex-1 mb-20'>
									<CheckoutCart
										items={items}
										onClickCountButton={onClickCountButton}
										removeCartItem={removeCartItem}
										loading={loading}
									/>

									<CheckoutPersonalForm
										className={loading ? 'opacity-40 pointer-events-none' : ''}
									/>

									<CheckoutAddressForm
										className={loading ? 'opacity-40 pointer-events-none' : ''}
									/>
								</div>

								<div className='w-[450px]'>
									<CheckoutSidebar
										vatPrice={vatPrice}
										totalAmountWithFees={totalAmountWithFees}
										totalAmount={totalAmount}
										loading={loading || submitting}
									/>
								</div>
							</div>
						</form>
					</FormProvider>

					<ConfirmPaymentModal
						open={status}
						stopPaymentProcess={stopPaymentProcess}
						onClickConfirmPayment={onClickConfirmPayment}
					/>
				</>
			) : (
				<div className='flex flex-col items-center justify-center w-72 mx-auto'>
					<Image
						src='/assets/images/empty-box.png'
						alt='Empty cart'
						width={120}
						height={120}
					/>
					<Title
						size='sm'
						text='Корзина пустая'
						className='text-center font-bold my-2'
					/>
					<p className='text-center text-neutral-500 mb-5'>
						Добавьте хотя бы одну пиццу, чтобы совершить заказ
					</p>

					<Button
						className='w-56 h-12 text-base'
						size='lg'
						onClick={() => router.back()}
					>
						<ArrowLeft className='w-5 mr-2' />
						Вернуться назад
					</Button>
				</div>
			)}
		</Container>
	)
}
