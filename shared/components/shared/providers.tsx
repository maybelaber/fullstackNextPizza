import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { Suspense } from 'react'

import { Toaster } from 'react-hot-toast'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Suspense>
				<SessionProvider>{children}</SessionProvider>
			</Suspense>
			<Toaster />
			<NextTopLoader />
		</>
	)
}
