import PropTypes from 'prop-types'

/**
 * Status
 * 
 * Renders a ChartJS chart to show data over a timeline.
 * 
 * @param {*} props
 * @param {String} props.status text for the status of a request
 * @returns void
 */
export default function Status({ status }) {
    return (
        <p>{status}</p>
    )
}

Status.propTypes = {
    status: PropTypes.string
}

Status.defaultProps = {
    status: ''
}