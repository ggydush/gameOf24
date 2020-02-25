import React, { Component } from 'react'
import './GameCard.css'

export default class GameCard extends Component {
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
				<div className="operation">÷</div>
				<div className="operation">x</div>
				<div className="circle">
					<div className="square">
						<div>(</div>
						<div>)</div>
					</div>
					<div className="cross">{this.renderList()}</div>
				</div>
			</div>
		)
	}
}
