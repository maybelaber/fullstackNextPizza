import { create } from 'zustand'
import { CheckoutFormValues } from '../constants'

interface State {
	paymentData: string
	paymentSignature: string
	status: boolean
	formData?: CheckoutFormValues
	setPaymentData: (data: string) => void
	setPaymentSignature: (signature: string) => void
	setStatus: (status: boolean) => void
	setFormData: (data: CheckoutFormValues) => void

	// TODO: delete
	requestData: any
	setRequestData: (data: any) => void
}

export const usePaymentStore = create<State>(set => ({
	paymentData: '',
	paymentSignature: '',
	status: false,
	formData: undefined,
	setPaymentData: paymentData => set({ paymentData }),
	setPaymentSignature: paymentSignature => set({ paymentSignature }),
	setStatus: status => set({ status }),
	setFormData: formData => set({ formData }),

	// TODO: delete
	requestData: undefined,
	setRequestData: requestData => set({ requestData }),
}))
