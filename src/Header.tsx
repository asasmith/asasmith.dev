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
        link: 'https://github.com/asasmith',
        icon: ghIcon,
    },
    {
        link: 'https://www.linkedin.com/in/asa-smith-78760a56/',
        icon: liIcon,
    },
    {
        link: 'https://www.twitch.tv/average_dev_asa',
        icon: twitchIcon,
    },
    {
        link: 'https://resume.asasmith.dev',
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
                    return (
                        <a href={item.link} className="w-12 ml-8">
                            <img src={item.icon} />
                        </a>
                    );
                })}
            </nav>
        </header>
    );
};
