'use client'

import { updateUserInfo } from '@/app/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Container, FormInput, OrdersComponent, Title } from '.'
import { Button } from '..'
import {
	formRegisterSchema,
	TypeFormRegisterValues,
} from './modals/auth-modal/forms/schemas'

interface IProps {
	data: User
}

export const ProfileForm: React.FC<IProps> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data?.fullName,
			email: data?.email,
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TypeFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.error('Данные обновлены', {
				icon: '✅',
			})
		} catch (error) {
			console.log('[ProfileForm] Failed updating user info', error)
			toast.error('Failed updating user info', {
				icon: '❌',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({ callbackUrl: '/' })
	}

	return (
		<Container className='my-10 flex flex-col gap-10'>
			<div>
				<Title
					text={`Личные данные | #${data.id}`}
					size='md'
					className='font-bold'
				/>
				<FormProvider {...form}>
					<form
						className='flex flex-col gap-5 w-96 mt-10'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormInput name='email' label='E-Mail' required />
						<FormInput name='fullName' label='Полное имя' required />
						<FormInput
							type='password'
							name='password'
							label='Новый пароль'
							required
						/>
						<FormInput
							type='password'
							name='confirmPassword'
							label='Повторите пароль'
							required
						/>
						<Button
							disabled={form.formState.isSubmitting}
							className='text-base mt-10'
							type='submit'
						>
							Сохранить
						</Button>
						<Button
							onClick={onClickSignOut}
							variant='secondary'
							disabled={form.formState.isSubmitting}
							className='text-base'
							type='button'
						>
							Выйти
						</Button>
					</form>
				</FormProvider>
			</div>

			<OrdersComponent />
		</Container>
	)
}
