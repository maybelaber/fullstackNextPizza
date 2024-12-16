'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from '..'

interface IProps {
	className?: string
}

export const CheckoutAddressForm: React.FC<IProps> = ({ className }) => {
	const { control } = useFormContext()

	return (
		<WhiteBlock title='3. Адрес доставки' contentClassName='p-8'>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />

							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name='comment'
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
