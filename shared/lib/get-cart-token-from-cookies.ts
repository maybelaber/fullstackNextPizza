import { parseCookies } from 'nookies'

export const getCartTokenFromCookies = (ctx = null) => {
	const cookies = parseCookies(ctx)
	return cookies.cartToken || null
}
