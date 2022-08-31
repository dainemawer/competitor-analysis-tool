import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Card
 * 
 * Displays informative cards on the index page when a user is logged in.
 * 
 * @param {*} props
 * @param {String} props.alt alt attribute value for image
 * @param {String} props.description informative text for Card component
 * @param {String} props.label cta label text
 * @param {String} props.permalink cta hyperlink value
 * @param {String} props.title title text for Card component
 * @returns void
 */
export default function Card({ alt, description, image, label, permalink, title }) {
    return (
        <article className="flex items-center mb-8">
            <figure className="rounded-full shadow-md">
                <Image className="rounded-full" src={image} alt={alt} layout="fixed" height="200" width="200" />
            </figure>
            <div className="ml-8">
                {title && <h3 className="text-2xl font-medium mb-2 mt-4">{title}</h3>}
                {description && (<p>{description}</p>)}
                {permalink && (<Link href="/projects/new"><a className="bg-rose-500 inline-block hover:bg-rose-700 focus:bg-rose-700 transition-colors text-center text-sm font-semibold py-3 px-6 mt-4 text-white">{label}</a></Link>)}
            </div>
        </article>
    )
}

Card.propTypes = {
    alt: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string,
    permalink: PropTypes.string,
    title: PropTypes.string,
}

Card.defaultProps = {
    alt: '',
    description: '',
    image: '',
    label: '',
    permalink: '',
    title: ''
}