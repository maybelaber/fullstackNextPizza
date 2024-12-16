import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib/get-user-session'
import { NextResponse } from 'next/server'

export async function GET() {
	const user = await getUserSession()

	try {
		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}

		const data = await prisma.order.findMany({
			where: {
				userId: Number(user.id),
			},
			orderBy: {
				id: 'desc',
			},
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log('[USER_GET] Server error', error)
		return NextResponse.json(
			{ message: '[USER_GET] Server error' },
			{ status: 500 }
		)
	}
}
