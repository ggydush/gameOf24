import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import './MathInputBox.css'

const MathInputBox = ({ value, total, onChange, onSubmit, backspace }) => {
	return (
		<div className="math-input-box">
			<form action="" onSubmit={onSubmit}>
				<input onChange={onChange} value={value} type="text" />
				<FontAwesomeIcon
					icon={faBackspace}
					className="backspace"
					onClick={backspace}
				/>
			</form>
			<div className="output">{total}</div>
		</div>
	)
}

export default MathInputBox
