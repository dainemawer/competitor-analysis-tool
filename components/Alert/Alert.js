
import PropTypes from 'prop-types'
import Icon from '@components/Icon/Icon'

/**
 * Alert
 * 
 * Displayed to the user when no data is available on a project page.
 * 
 * @param {*} props
 * @param {string} props.label informative text for Alert component
 * @returns void
 */
export default function Alert({ label }) {
    return (
        <p className="text-rose-500 flex items-center text-sm mb-6">
            <Icon id="alert" />
            {label}
        </p>
    )
}

Alert.propTypes = {
    label: PropTypes.string
}

Alert.defaultProps = {
    label: ''
}