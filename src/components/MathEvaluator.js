import React, { Component } from 'react'
import { evaluate } from 'mathjs'
import './MathEvaluator.css'

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

export default class MathEvaluator extends Component {
	state = { text: '', output: '' }

	updateInput = (value) => {
		const string = sanitizeInput(value)
		if (!string) {
			this.setState({ text: '', output: '' })
			return
		}
		this.setState({ text: string })
		try {
			const output = evaluate(string)
			this.setState({ text: string, output: output })
		} catch (e) {}
	}
	onInputChange = (event) => {
		this.updateInput(event.target.value)
	}
	onFormSubmit = (event) => {
		event.preventDefault()
		const res = this.props.onSubmit(this.state.text, this.state.output)
		if (res) {
			this.setState({ text: '', output: '' })
		}
	}
	render() {
		return (
			<div className="math-evaluator">
				<div className="row">
					<form action="" onSubmit={this.onFormSubmit}>
						<input
							className="math-evaluator-input"
							type="text"
							onChange={this.onInputChange}
							value={this.state.text}
						/>
					</form>
					<div className="math-evaluator-output">
						{this.state.output}
					</div>
				</div>
				<div className="row button-row">
					<button onClick={this.onFormSubmit}>Submit</button>
					<button onClick={this.props.showCard}>I Give Up</button>
				</div>
			</div>
		)
	}
}
