import React, { Component } from 'react'
import './GameCard.css'

export default class GameCard extends Component {
	renderList() {
		return this.props.numbers.map((number, idx) => {
			const onClick = this.props.onClick
			return (
				<div
					data-value={number}
					className="number"
					key={idx}
					onClick={onClick}
				>
					{number}
				</div>
			)
		})
	}
	render() {
		const onClick = this.props.onClick
		return (
			<div className="game-card">
				<div data-value="+" className="operation" onClick={onClick}>
					+
				</div>
				<div data-value="-" className="operation" onClick={onClick}>
					-
				</div>
				<div data-value="/" className="operation" onClick={onClick}>
					÷
				</div>
				<div data-value="*" className="operation" onClick={onClick}>
					x
				</div>
				<div className="circle">
					<div className="square">
						<div data-value="(" onClick={onClick}>
							(
						</div>
						<div data-value=")" onClick={onClick}>
							)
						</div>
					</div>
					<div className="cross">{this.renderList()}</div>
				</div>
			</div>
		)
	}
}
