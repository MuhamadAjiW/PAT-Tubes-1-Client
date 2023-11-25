import './Header.css'

interface HeaderProps{
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return(
        <nav className="Header">
            <h1 className="Title">{ title }</h1>
        </nav>
    )
}

export default Header;