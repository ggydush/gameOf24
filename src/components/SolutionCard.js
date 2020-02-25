import React from 'react'
import SolutionDetail from './SolutionDetail'
import './SolutionCard.css'

const SolutionCard = ({ solutions, userSolution, newCard, showSolution }) => {
	if (!showSolution) {
		return null
	}
	let userSolutionInfo = ''
	if (userSolution) {
		userSolutionInfo = (
			<div className="user-solution-detail">
				<h2>User Solution:</h2>
				<div className="solution">{userSolution}</div>
			</div>
		)
	}
	return (
		<div className="solution-card">
			{userSolutionInfo}
			<SolutionDetail solutions={solutions} />
			<button onClick={newCard}>Next Problem</button>
		</div>
	)
}

export default SolutionCard
