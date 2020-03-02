import React, { Component } from 'react'
import { evaluate } from 'mathjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

import GameBoard from './GameBoard'
import MathInputBox from './MathInputBox'
import SolutionCard from './SolutionCard'
import HelpCard from './HelpCard'
import { solver } from '../scripts/solver'

import './App.css'

const colors = {
	red: 'rgb(205, 82, 82)',
	orange: 'rgb(225, 133, 63)',
	yellow: 'rgb(225, 179, 63)',
	green: 'rgb(71, 189, 154)',
	blue: 'rgb(63, 122, 225)',
	purple: 'rgb(140, 111, 208)',
}

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
		'÷',
		'\u0020',
	]
	string = string.toLowerCase()
	const result = []
	for (let char of string) {
		if (acceptableChars.includes(char)) {
			result.push(char.replace('x', '*').replace('÷', '/'))
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
		colorIdx: 5,
		showSolution: false,
		showHelp: true,
	}

	createNewCard = () => {
		const [ arr, solutions ] = generateSolvableArray(this.state.solveFor)
		const newColorIdx =
			(this.state.colorIdx + 1) % Object.keys(colors).length
		this.setState({
			text: '',
			numbers: arr,
			solutions: solutions,
			total: 0,
			showSolution: false,
			colorIdx: newColorIdx,
		})
		this.setColor(newColorIdx)
	}

	componentDidMount = () => {
		this.createNewCard()
		this.setColor(this.state.colorIdx)
		document.querySelector('.overlay').addEventListener('click', (e) => {
			if (
				e.target.tagName !== 'path' &&
				e.target.className.includes('overlay')
			) {
				if (this.state.showSolution || this.state.showHelp) {
					this.hideCards()
				}
			}
		})
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

	backspace = (e) => {
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

	onSolveForChange = (event) => {
		this.setState(
			{ solveFor: parseInt(event.target.value) },
			this.createNewCard,
		)
	}

	setColor(colorIdx) {
		const rgb = colors[Object.keys(colors)[colorIdx]]
		document.documentElement.style.setProperty(
			'--game-card-background',
			rgb,
		)
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
			this.toggleSolution()
		}
	}

	hideCards = () => {
		document.querySelector('.overlay').classList.toggle('hide')
		this.setState({ showSolution: false, showHelp: false })
	}

	toggleSolution = () => {
		this.hideCards()
		this.setState({ showSolution: !this.state.showSolution })
	}

	toggleHelp = () => {
		this.hideCards()
		this.setState({ showHelp: !this.state.showHelp })
	}

	render() {
		return (
			<div className="app">
				<div className="overlay" />
				<div className="github">
					<a href="https://github.com/ggydush/gameOf24">
						<h3>
							GitHub
							<FontAwesomeIcon
								icon={faGithubSquare}
								className="github-icon"
							/>
						</h3>
					</a>
				</div>

				<h1>Solve for: {this.state.solveFor}</h1>
				<GameBoard
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
					show={this.state.showSolution}
					toggleSolution={this.toggleSolution}
				/>

				<div className="buttons">
					<button className="button" onClick={this.submitSolution}>
						Submit
					</button>
					<button className="button" onClick={this.toggleSolution}>
						I Give Up
					</button>
					<button className="button" onClick={this.toggleHelp}>
						How to Play
					</button>
				</div>
				<HelpCard
					show={this.state.showHelp}
					toggleHelp={this.toggleHelp}
					selectedSolveFor={this.state.solveFor}
					onSolveForChange={this.onSolveForChange}
				/>
			</div>
		)
	}
}
