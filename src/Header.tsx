// import logo from './assets/logo.svg';
import { Link } from 'react-router';
// import logoFull from './assets/logo-full.svg';
import { LogoFull } from './icons/LogoFull';
import ghIcon from './assets/github-icon.svg';
import liIcon from './assets/linkedin-icon.svg';
import resumeIcon from './assets/resume-icon.svg';
import twitchIcon from './assets/twitch-icon.svg';

const navItems = [
    {
        href: 'https://github.com/asasmith',
        icon: ghIcon,
    },
    {
        href: 'https://www.linkedin.com/in/asa-smith-78760a56/',
        icon: liIcon,
    },
    {
        href: 'https://www.twitch.tv/average_dev_asa',
        icon: twitchIcon,
    },
    {
        href: 'https://resume.asasmith.dev',
        icon: resumeIcon,
    },
];

export const Header = () => {
    return (
        <header className="fixed top-0 right-0 left-0 flex items-center justify-between bg-white p-8 shadow-md">
            <Link to="/" className="w-60">
                <LogoFull />
            </Link>
            <nav className="flex items-center">
                {navItems.map((item) => {
                    const { href, icon } = item;
                    return (
                        <a href={href} className="w-12 ml-8" key={href}>
                            <img src={icon} />
                        </a>
                    );
                })}
            </nav>
        </header>
    );
};
