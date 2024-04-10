import './header.css';
import LayerDropdown from "./layerdropdown";

const Header = () => {
    return (
        <div className="header">
            <div className="header-section-left">
                <input className="header-input" type="text" placeholder="Username" name="username"/>
                <input className="header-input" type="password" placeholder="Password" name="password"/>
                <button className="header-input" type="button">Log In</button>
            </div>
            <div className="header-section-center">
                <h1>13 Grounded</h1>
            </div>
            <div className="header-section-right">
                <input type="text" placeholder="Search" name="search"/>
            </div>
        </div>
    );
}

export default Header;