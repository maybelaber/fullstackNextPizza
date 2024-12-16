'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='d8f2250d76fdd7cdc4a429e83e06832102485e76'
			onChange={data => onChange?.(data?.value)}
		/>
	)
}
