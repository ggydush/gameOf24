import React, { Component } from 'react'
import MathEvaluator from './MathEvaluator'
import GameCard from './GameCard'
import SolutionCard from './SolutionCard'
import './App.css'

import { solver } from '../scripts/solver'

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

export default class App extends Component {
	state = {
		solveFor: 24,
		numbers: [],
		solutions: [],
		userSolution: null,
		showSolution: false,
	}
	createNewCard = () => {
		let [ arr, solution ] = generateSolvableArray(this.state.solveFor)
		this.setState({
			numbers: arr,
			solutions: solution,
			userSolution: null,
			showSolution: false,
		})
	}
	componentDidMount = () => {
		this.createNewCard()
	}
	onFormSubmit = (string, output) => {
		if (output === this.state.solveFor) {
			const numbers = string.match(/\d+/g).map(Number)
			const foundSolution = checkIfEqual(numbers, this.state.numbers)
			if (foundSolution) {
				this.setState({ userSolution: string, showSolution: true })
				return true
			}
		}
	}
	showCard = () => {
		this.setState({ showSolution: !this.state.showSolution })
	}
	render() {
		return (
			<div className="app">
				<GameCard numbers={this.state.numbers} />
				<MathEvaluator
					onSubmit={this.onFormSubmit}
					showCard={this.showCard}
				/>
				<SolutionCard
					userSolution={this.state.userSolution}
					solutions={this.state.solutions}
					newCard={this.createNewCard}
					showSolution={this.state.showSolution}
				/>
			</div>
		)
	}
}
