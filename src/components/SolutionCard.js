import React from 'react'
import SolutionDetail from './SolutionDetail'
import './SolutionCard.css'

const SolutionCard = ({
    userSolution,
    solved,
    solutions,
    newCard,
    show,
    toggleSolution,
}) => {
    if (!show) {
        return null
    }
    const createNewCard = () => {
        toggleSolution()
        newCard()
    }
    let userSolutionInfo = ''
    if (userSolution && solved) {
        userSolutionInfo = (
            <div className="user-solution-detail">
                <h1 className="header">Solved (EZ)</h1>
                <h2>User Solution:</h2>
                <div className="solution">{userSolution}</div>
            </div>
        )
    }
    return (
        <div className="card">
            {userSolutionInfo}
            <SolutionDetail solutions={solutions} />
            <button className="button" onClick={createNewCard}>
                Try Another
            </button>
        </div>
    )
}

export default SolutionCard
