'use client'

import { useFormContext } from 'react-hook-form'
import { ClearButton, ErrorText, RequiredSymbol } from '..'
import { Input } from '../../ui'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message

	const onClickClear = () => {
		setValue(name, '', { shouldValidate: true })
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='h-12 text-md' {...register(name)} {...props} />

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText as string} className='mt-2' />}
		</div>
	)
}
