'use client'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NoMatch() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '10px', color: 'gray' }} />
            <h3>URL not found!</h3>
        </div>
    )
}

export default NoMatch
