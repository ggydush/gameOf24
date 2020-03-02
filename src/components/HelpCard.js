import React from 'react'

import './HelpCard.css'
import GameBoard from './GameBoard'

const HelpCard = ({ show, toggleHelp, selectedSolveFor, onSolveForChange }) => {
	if (!show) {
		return null
	}

	return (
		<div className="card">
			<h2>How To Play</h2>

			<p>
				I always enjoyed playing the <strong>24 Game</strong> in
				elementary school, anyone else getting nostalgic? If not, the
				rules are simple:
				<br />
				<br />
				Find a way to manipulate the 4 integers to create
				<strong> 24</strong> using addition, subtraction,
				multiplication, and division. You must use all 4 numbers.<br />
			</p>
			<GameBoard numbers={[ 8, 3, 7, 2 ]} small={true} />
			<p>
				For this card, an example solution would be:<br />
				<span>(8 - 2) x (7 - 3) = 24</span>
				<br />
				<br />
				We can also play the game with other numbers besides
				<select value={selectedSolveFor} onChange={onSolveForChange}>
					{[ ...Array(25).keys() ].map((value, index) => {
						if (value !== 0) {
							return <option key={index}>{value}</option>
						}
					})}
				</select>
			</p>
			<button className="button" onClick={toggleHelp}>
				OK I'm Ready!
			</button>
		</div>
	)
}

export default HelpCard
