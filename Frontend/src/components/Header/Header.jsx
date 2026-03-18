import "./Header.css"
import {useLocation} from "react-router-dom";

function Header() {

    const location = useLocation();
    let title = null;

    if (location.pathname === "/") {
        title = "Home"
    }
    if (location.pathname === "/upload") {
        title = "Upload Documents";
    }
    if (location.pathname === "/review") {
        title = "Review AI Data";
    }
    if (location.pathname === "/confirm") {
        title = "Confirm and Attach";
    }

    return (
        <div className="header">
            <h2>{title}</h2>
        </div>
    );
}

export default Header;