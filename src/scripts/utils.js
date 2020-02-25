/**
 * Create list of permuations from array
 * @param {Array} inputArr Array to perform permuations
 * @returns {Array} Permutation array
 */
export const permutations = (inputArr) => {
	let result = []
	const permute = (arr, tmp = []) => {
		if (arr.length === 0) {
			result.push(tmp)
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice()
				let next = curr.splice(i, 1)
				permute(curr.slice(), tmp.concat(next))
			}
		}
	}
	permute(inputArr)
	return result
}

/**
 * Javascript implementation of itertools.product in python
 * https://gist.github.com/cybercase/db7dde901d7070c98c48
 * @param {iterable} iterables Any iterable
 * @param {Number} repeat Create product with itself repeat number times
 * @returns
 */
export function product(iterables, repeat = 3) {
	var argv = Array.prototype.slice.call(arguments),
		argc = argv.length
	if (argc === 2 && !isNaN(argv[argc - 1])) {
		var copies = []
		for (var i = 0; i < argv[argc - 1]; i++) {
			copies.push(argv[0].slice())
		}
		argv = copies
	}
	return argv.reduce(
		(accumulator, value) => {
			var tmp = []
			accumulator.forEach(function(a0) {
				value.forEach(function(a1) {
					tmp.push(a0.concat(a1))
				})
			})
			return tmp
		},
		[ [] ],
	)
}
