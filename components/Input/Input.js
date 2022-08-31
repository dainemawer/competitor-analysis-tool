import PropTypes from 'prop-types'

/**
 * Input
 * 
 * A global input component that is integrated with React Hook Form
 * 
 * @param {*} props
 * @param {String} props.label the input label
 * @param {String} props.placeholder value for the input placeholder attribute
 * @param {Function} props.register a ref function passed from React Hook Form
 * @param {String} props.type value for the input type attribute
 * @returns void
 */
export default function Input({ label, type, placeholder, register }) {
    return (
        <div className="block w-full mb-8">
            <label htmlFor={label} className="block text-sm font-semibold mb-2">
                {label}
                <input id={label} className="border-2 block border-gray-600 w-full" type={type} {...register(label.replace(' ', '_').toLowerCase())} placeholder={placeholder} />
            </label>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    reigster: PropTypes.func.isRequired,
    type: PropTypes.string,
}

Input.defaultProps = {
    label: '',
    placeholder: '',
    type: '',
}