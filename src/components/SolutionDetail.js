import React from 'react'

const SolutionDetail = ({ solutions }) => {
    const renderedList = solutions.map((solution, idx) => {
        return (
            <div className="solution" key={idx}>
                {solution}
            </div>
        )
    })
    return (
        <div className="solution-detail">
            <h2>Computed Solutions:</h2>
            {renderedList}
        </div>
    )
}

export default SolutionDetail
