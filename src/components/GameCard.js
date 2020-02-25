import React, { Component } from 'react'
import './GameCard.css'

export default class GameCard extends Component {
	handleButtonClick = (event) => {
		const text = event.target.innerHTML
		this.props.handleButtonClick(text)
	}
	renderList() {
		return this.props.numbers.map((number, idx) => {
			return (
				<div className="number" key={idx}>
					{number}
				</div>
			)
		})
	}
	render() {
		return (
			<div className="game-card">
				<div className="operation">+</div>
				<div className="operation">-</div>
				<div className="operation">x</div>
				<div className="operation">÷</div>
				<div className="circle">
					<div className="cross">{this.renderList()}</div>
				</div>
			</div>
		)
	}
}
