import React from 'react'
import ExampleImage from '../images/example.png'
import './HelpCard.css'

const HelpCard = ({ show, toggleHelp }) => {
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
				multiplication, and division.<br />
				<img src={ExampleImage} alt="Card with 8, 3, 7, 2" />
				<br />
				For this card, an example solution would be:<br />
				(8 - 2) x (7 - 3) = 24
			</p>
			<button className="button" onClick={toggleHelp}>
				OK I'm Ready!
			</button>
		</div>
	)
}

export default HelpCard
