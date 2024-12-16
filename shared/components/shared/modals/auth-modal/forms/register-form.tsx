import { registerUser } from '@/app/actions'
import { Button, FormInput } from '@/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formRegisterSchema, TypeFormRegisterValues } from './schemas'

interface IProps {
	onClose?: VoidFunction
}

export const RegisterForm: React.FC<IProps> = ({ onClose }) => {
	const form = useForm<TypeFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TypeFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
				icon: '✅',
			})

			onClose?.()
		} catch (error) {
			return toast.error('Неверный E-Mail или пароль', {
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
				<FormInput name='email' label='E-Mail' required />
				<FormInput name='fullName' label='Полное имя' required />
				<FormInput name='password' label='Пароль' type='password' required />
				<FormInput
					name='confirmPassword'
					label='Подтвердить пароль'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}