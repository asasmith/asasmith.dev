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
        <header className="fixed top-0 right-0 left-0 flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 shadow-md">
            <Link to="/" className="">
                <LogoFull />
            </Link>
            <nav className="flex items-center justify-between w-full md:w-1/3 lg:w-1/4 max-w-80">
                {navItems.map((item) => {
                    const { href, icon } = item;
                    return (
                        <a href={href} className="w-12" key={href}>
                            <img src={icon} />
                        </a>
                    );
                })}
            </nav>
        </header>
    );
};
