import { ClipboardList, Search, CheckCircle, CheckCircle2, SearchX, SearchSlash } from "lucide-react";
import {NavLink} from "react-router-dom";
import Icon from "../Icon/Icon";
import "./Navbar.css";


function Navbar() {
    return (
        <div className="navbar">
            <NavLink to="/upload">
                <Icon item={ClipboardList} name="Upload"></Icon>
            </NavLink>

            <NavLink to="/review">
                <Icon item={Search} name="Review"></Icon>
            </NavLink>

            <NavLink to="/confirm">
                <Icon item={CheckCircle2} name="Confirm"></Icon>
            </NavLink>
        </div>
    );
}

export default Navbar;
