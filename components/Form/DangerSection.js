import PropTypes from 'prop-types'

/**
 * Danger Section
 * 
 * Appears under the /profile page and is used for deleting data and accounts.
 * 
 * @param {*} props
 * @param {String} props.description informative text for the danger section
 * @param {Function} props.handleClick a click handler function for the button
 * @param {String} props.label label for the button
 * @param {String} props.title title for the Danger Section
 * @returns void
 */
export default function DangerSection({ description, handleClick, label, title }) {
    return (
        <div className="mb-6">
            <h4 className="text-sm mb-3">{title}</h4>
            <p className="text-xs mb-4">{description}</p>
            <button onClick={handleClick} className="py-2 px-8 bg-red-700 hover:bg-red-800 focus:bg-red-800 transition-colors text-center text-white" type="submit">{label}</button>
        </div>
    )
}

DangerSection.propTypes = {
    description: PropTypes.string,
    handleClick: PropTypes.func,
    label: PropTypes.string,
    title: PropTypes.string,
}

DangerSection.defaultProps = {
    description: '',
    handleClick: () => { },
    label: '',
    title: '',
}