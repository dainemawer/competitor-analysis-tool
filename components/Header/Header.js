import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Icon from '@components/Icon/Icon'
import { SiteContext } from '@context/store'

/**
 * Header
 * 
 * The applications global site header
 * 
 * @param {*} props
 * @param {String} props.pathname the current path name of the page
 * @param {String} props.testID if a test page, the testID is displayed
 * @param {String} props.title a title for the page
 * @param {Object} props.user the user object containing user information
 * @returns void
 */
export default function Header({ pathname, testID, title, user }) {
    const { isOpen, setIsOpen } = useContext(SiteContext);

    const handleMenuOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Escape') {
            setIsOpen(false)
        }
    }

    useEffect(() => {

        if( isOpen ) {
            document.body.classList.add('scroll-lock')
        } else {
            document.body.classList.remove('scroll-lock')
        }
        
        document.addEventListener('keydown', handleKeyDown)
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }) 

    return (
        <header className="border-b-[3px] pb-3 mb-8 lg:mb-16 flex flex-col lg:flex-row items-center justify-between border-black">
            <h3 className="font-bold flex items-center text-base lg:text-xl mb-4 lg:mb-0">
                {title}
                {testID && <small className="text-xs inline-block ml-4 bg-slate-100 py-1 px-2">{`ID: ${testID}`}</small>}
            </h3>
            <div>
                <button aria-expanded={isOpen} aria-controls="sidebar" onClick={handleMenuOpen} type="button" className="text-sm inline-flex lg:hidden font-semibold mr-4">
                    <Icon id="menu" />
                    <span className="sr-only">{isOpen ? 'Open' : 'Close'}</span>
                    Menu
                </button>
                {user && pathname !== '/profile' ? (
                    <Link href={{
                        pathname: '/profile',
                        query: {
                            user: user && user.id
                        }
                    }}>
                        <a className="text-sm inline-flex font-semibold mr-4">
                            <Icon id="profile" />
                            Profile
                        </a>
                    </Link>
                ) : (
                    <Link href="/">
                        <a className="text-sm inline-flex font-semibold mr-4">
                            <Icon id="home" />
                            Home
                        </a>
                    </Link>
                )}
                <Link href="/api/auth/logout">
                    <a className="text-sm inline-flex font-semibold">
                        <Icon id="logout" />
                        Logout
                    </a>
                </Link>
            </div>
        </header>
    )
}

Header.propTypes = {
    pathname: PropTypes.string,
    testID: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.objectOf(PropTypes.shape()),
}

Header.defaultProps = {
    pathname: '',
    testID: '',
    title: '',
    user: {},
}