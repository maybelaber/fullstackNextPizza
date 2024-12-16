import { Button, FormInput, Title } from '@/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formLoginSchema, TypeFormLoginValues } from './schemas'

interface IProps {
	onClose?: VoidFunction
}

export const LoginForm: React.FC<IProps> = ({ onClose }) => {
	const form = useForm<TypeFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TypeFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (resp?.error) {
				throw new Error('Failed to login')
			}

			toast.success('Logged in successfully', {
				icon: '✅',
			})

			onClose?.()
		} catch (error) {
			console.log('Error [LOGIN]', error)
			toast.error('Failed to login', {
				icon: '❌',
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title text='Вход в аккаунт' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src='/assets/images/phone-icon.png'
						alt='phone-icon'
						width={60}
						height={60}
					/>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput name='password' label='Password' type='password' required />

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	)
}
