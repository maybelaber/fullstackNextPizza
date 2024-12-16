import { Container, Header } from '@/shared/components/shared'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next Pizza | Корзина',
	description: 'Generated by create next app',
}

export default async function CartLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header
				hasSearch={false}
				hasCart={false}
				className='border-b-gray-200 bg-[#F4F1EE]'
			/>

			<main className='min-h-screen bg-[#F4F1EE]'>
				<Container>{children}</Container>
			</main>
		</>
	)
}
