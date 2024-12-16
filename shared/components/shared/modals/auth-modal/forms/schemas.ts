import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(6, { message: 'Minium 6 characters' })

export const formLoginSchema = z.object({
	email: z.string().email({
		message: 'Type a valid email',
	}),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Type name and surname' }),
			confirmPassword: passwordSchema,
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type TypeFormLoginValues = z.infer<typeof formLoginSchema>
export type TypeFormRegisterValues = z.infer<typeof formRegisterSchema>
