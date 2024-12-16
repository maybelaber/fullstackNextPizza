export const areArraysEqual = (arr1: number[], arr2: number[]) => {
	console.log(arr1.sort((a, b) => a - b).toString())
	console.log(arr2.sort((a, b) => a - b).toString())

	return (
		arr1.sort((a, b) => a - b).toString() ===
		arr2.sort((a, b) => a - b).toString()
	)
}
