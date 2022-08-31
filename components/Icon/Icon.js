import PropTypes from 'prop-types'
import { GoogleIcon, SlackIcon, GithubIcon, ProfileIcon, HomeIcon, LogoutIcon, AlertIcon, OverviewIcon, LightningIcon, TrendIcon, BookmarkIcon, MenuIcon, TenUpLogo } from './Icons';


/**
 * Icon
 * 
 * Executes a switch statement using the id value to render
 * one of the SVG icons listed above.
 * 
 * @param {*} props
 * @param {String} props.id a unique name for the icon
 * @returns void
 */
export default function Icon({ id }) {
    let icon = '';
    switch(id) {
        case 'google':
            return <GoogleIcon />;
        case 'slack':
            return <SlackIcon />;
        case 'github':
            return <GithubIcon />;
        case 'profile':
            return <ProfileIcon />;
        case 'home':
            return <HomeIcon />;
        case 'logout':
            return <LogoutIcon />;
        case 'alert':
            return <AlertIcon />;
        case 'overview':
            return <OverviewIcon />
        case 'lightning':
            return <LightningIcon />
        case 'trends':
            return <TrendIcon />
        case 'bookmark':
            return <BookmarkIcon />
        case 'menu':
            return <MenuIcon />
        case 'logo':
            return <TenUpLogo />
    }

    return icon;
}

Icon.propTypes = {
    id: PropTypes.string.isRequired
}

