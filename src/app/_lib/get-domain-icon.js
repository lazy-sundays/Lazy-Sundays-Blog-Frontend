import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
    faLink
} from '@fortawesome/free-solid-svg-icons'
import {
    faBandcamp,
    faBitbucket,
    faBluesky,
    faDiscord,
    faDribbble,
    faFacebook,
    faGithub,
    faGitlab,
    faInstagram,
    faLetterboxd,
    faLinkedin,
    faMedium,
    faPatreon,
    faPlaystation,
    faReddit,
    faSoundcloud,
    faSpotify,
    faTiktok,
    faTumblr,
    faTwitch,
    faTwitter,
    faXbox,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const iconLookup = {
    "bandcamp.com": faBandcamp,
    "bitbucket.org": faBitbucket,
    "bsky.app": faBluesky,
    "discord.gg": faDiscord,
    "dribbble.com": faDribbble,
    "facebook.com": faFacebook,
    "github.com": faGithub,
    "gitlab.com": faGitlab,
    "instagram.com": faInstagram,
    "letterboxd.com": faLetterboxd,
    "linkedin.com": faLinkedin,
    "boxd.it": faLetterboxd,
    "medium.com": faMedium,
    "patreon.com": faPatreon,
    "playstation.com": faPlaystation,
    "reddit.com": faReddit,
    "soundcloud.com": faSoundcloud,
    "spotify.com": faSpotify,
    "open.spotify.com": faSpotify,
    "tiktok.com": faTiktok,
    "tumblr.com": faTumblr,
    "twitch.tv": faTwitch,
    "twitter.com": faTwitter,
    "xbox.com": faXbox,
    "youtube.com": faYoutube,
};

export default function getDomainIcon(url) {
    //check if URL is an email address
    if (url.includes("mailto:")) return <FontAwesomeIcon icon={faEnvelope} className='mr-2 align-[-0.15em]'/>;

    try{
        //separate domain from full URL
        const uri = new URL(url);
    
        return (iconLookup[uri.hostname] ? <FontAwesomeIcon icon={iconLookup[uri.hostname]} className='mr-2 align-[-0.15em]'/> : <FontAwesomeIcon icon={faLink} className='mr-2 align-[-0.15em]'/>);
    }
    catch {
        return <FontAwesomeIcon icon={faLink} className='mr-2 align-[-0.15em]'/>;
    }
}