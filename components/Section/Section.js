import PropTypes from 'prop-types'
import Icon from '@components/Icon/Icon'

/**
 * Sidebar
 * 
 * Renders the global sidebar UI that appears on all pages.
 * 
 * @param {*} props
 * @param {Array} props.children an array of React child nodes,
 * @param {String} props.description description for the section
 * @param {String} props.icon an icon ID for the section
 * @param {String} props.title the title for the section
 * @returns void
 */
export default function Section({ children, description, icon, title }) {
    return (
        <section className="bg-white shadow-lg p-6 my-6 lg:my-12">
            <header>
                <h2 className="text-xl flex items-center font-semibold">
                    <Icon id={icon} />
                    {title}
                </h2>
                <p className="mb-6 text-sm border-b-2 pb-4">{description}</p>
            </header>
            {children}
        </section>
       
    )
}

Section.propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
}

Section.defaultProps = {
    children: '',
    description: '',
    icon: '',
    title: '',
}