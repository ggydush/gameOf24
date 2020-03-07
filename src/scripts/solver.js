import { permutations, product } from './utils'

const add = (a, b) => {
    return a + b
}

const subtract = (a, b) => {
    return a - b
}

const multiply = (a, b) => {
    return a * b
}

const divide = (a, b) => {
    if (a < b || b === 0 || a % b !== 0) {
        return 99999
    }
    return a / b
}

const solver = (numbers, total) => {
    const operations = [ add, subtract, multiply, divide ]
    const symbols = [ '+', '-', 'x', '÷' ]
    const solutions = new Set()
    const result = []
    for (let [ o1, o2, o3 ] of product(operations, 3)) {
        let s1 = symbols[operations.indexOf(o1)]
        let s2 = symbols[operations.indexOf(o2)]
        let s3 = symbols[operations.indexOf(o3)]
        for (let [ a, b, c, d ] of permutations(numbers)) {
            let solution = null
            if (o1(o2(a, b), o3(c, d)) === total) {
                solution = `(${a} ${s2} ${b}) ${s1} (${c} ${s3} ${d})`
            } else if (o1(a, o2(b, o3(c, d))) === total) {
                solution = `${a} ${s1} (${b} ${s2} (${c} ${s3} ${d}))`
            } else if (o1(o2(b, o3(c, d)), a) === total) {
                solution = `${b} ${s2} (${c} ${s3} ${d}) ${s1} ${a}`
            } else if (o1(o2(o3(c, d), b), a) === total) {
                solution = `((${c} ${s3} ${d}) ${s2} ${b}) ${s1} ${a}`
            }
            if (solution) {
                const solutionName = solution.split('').sort().join('')
                if (!solutions.has(solutionName)) {
                    solutions.add(solutionName)
                    result.push(solution)
                }
            }
        }
    }
    return result
}

export { add, subtract, multiply, divide, solver }
