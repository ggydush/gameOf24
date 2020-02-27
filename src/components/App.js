import React, { Component } from 'react'
import { evaluate } from 'mathjs'

import GameCard from './GameCard'
import MathInputBox from './MathInputBox'
import SolutionCard from './SolutionCard'
import HelpPage from './HelpPage'
import { solver } from '../scripts/solver'

import './App.css'

const generateNumber = () => {
	return Math.floor(Math.random() * 10)
}

const generateSolvableArray = (solveFor) => {
	while (true) {
		const arr = Array.from({ length: 4 }, generateNumber)
		const solution = solver(arr, solveFor)
		if (solution.length > 0) {
			return [ arr, solution ]
		}
	}
}

const checkIfEqual = (arr1, arr2) => {
	return arr1.sort().join(',') === arr2.sort().join(',')
}

function sanitizeInput(string) {
	const acceptableChars = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'(',
		')',
		'+',
		'-',
		'*',
		'x',
		'/',
		'\u0020',
	]
	string = string.toLowerCase()
	const result = []
	for (let char of string) {
		if (acceptableChars.includes(char)) {
			result.push(char.replace('x', '*'))
		}
	}
	return result.join('')
}

export default class App extends Component {
	state = {
		text: '',
		numbers: [],
		solutions: [],
		solveFor: 24,
		total: 0, // Ideally exclude from state, but execute in Mathjs errors a lot
		showSolution: false,
		showHelp: true,
	}

	createNewCard = () => {
		document.querySelector('.overlay').classList.toggle('show')
		const [ arr, solutions ] = generateSolvableArray(this.state.solveFor)
		this.setState({
			text: '',
			numbers: arr,
			solutions: solutions,
			total: 0,
			showSolution: false,
		})
	}

	componentDidMount = () => {
		this.createNewCard()
		document.querySelector('body').addEventListener('click', (e) => {
			if (
				e.target.className === 'app' ||
				e.target.className.includes('overlay')
			) {
				document.querySelector('.overlay').classList.remove('show')
				this.setState({ showSolution: false })
				this.setState({ showHelp: false })
			}
		})
	}
	showHideHelp = () => {
		if (!this.state.showHelp) {
			this.setState({ showSolution: false })
		}
		document.querySelector('.overlay').classList.toggle('show')
		this.setState({ showHelp: !this.state.showHelp })
	}
	showHideCard = () => {
		if (!this.state.showSolution) {
			this.setState({ showHelp: false })
		}
		document.querySelector('.overlay').classList.toggle('show')
		this.setState({ showSolution: !this.state.showSolution })
	}

	getSolutions() {
		return solver(this.state.numbers, this.state.solveFor)
	}

	calculateOutput(text) {
		try {
			return Math.round(evaluate(text) * 100) / 100
		} catch (e) {
			return null
		}
	}
	updateInput(text) {
		const updatedText = sanitizeInput(text)
		const total =
			text.length === 0
				? 0
				: this.calculateOutput(text) || this.state.total
		this.setState({ text: updatedText, total: total })
	}
	backspace = () => {
		const updatedText = this.state.text.slice(0, -1)
		this.updateInput(updatedText)
	}

	onInputChange = (event) => {
		this.updateInput(event.target.value)
	}
	onButtonClick = (event) => {
		const updatedText =
			this.state.text + event.target.getAttribute('data-value')
		this.updateInput(updatedText)
	}
	checkIfSolved = () => {
		if (this.state.total === this.state.solveFor) {
			const inputNumbers = this.state.text.match(/\d+/g).map(Number)
			const numbersToCheck = [ ...this.state.numbers ]
			return checkIfEqual(inputNumbers, numbersToCheck)
		}
	}

	submitSolution = (event) => {
		event.preventDefault()
		if (this.checkIfSolved()) {
			this.setState({ showSolution: !this.state.showSolution })
			document.querySelector('.overlay').classList.toggle('show')
		}
	}

	render() {
		return (
			<div className="app">
				<div className="overlay" />
				<GameCard
					numbers={this.state.numbers}
					onClick={this.onButtonClick}
				/>
				<MathInputBox
					value={this.state.text}
					onChange={this.onInputChange}
					onSubmit={this.submitSolution}
					total={this.state.total}
					backspace={this.backspace}
				/>
				<SolutionCard
					userSolution={this.state.text}
					solved={this.checkIfSolved()}
					solutions={this.state.solutions}
					newCard={this.createNewCard}
					showSolution={this.state.showSolution}
				/>

				<div className="buttons">
					<button className="button" onClick={this.submitSolution}>
						Submit
					</button>
					<button className="button" onClick={this.showHideCard}>
						I Give Up
					</button>
					<button className="button" onClick={this.showHideHelp}>
						How to Play
					</button>
				</div>
				<HelpPage
					show={this.state.showHelp}
					showHideHelp={this.showHideHelp}
				/>
			</div>
		)
	}
}
