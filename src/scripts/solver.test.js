import { add, solver } from './solver'

test('adds 1 + 2 to equal 3', () => {
	expect(add(1, 2)).toBe(3)
})

test('tests solver with 24', () => {
	const result = solver([ 1, 2, 3, 4 ], 24)
	expect(result[0]).toBe('(1 + 3) x (2 + 4)')
	expect(result.length).toBe(4)
})

test('test unsolveable with 24', () => {
	const result = solver([ 3, 3, 8, 8 ])
	expect(result.length).toBe(0)
})
