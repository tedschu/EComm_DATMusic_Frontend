// Persistent nav bar with logo / site name and user icon
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/logo.jpeg";

function Nav() {
  return (
    <>
      <nav>
        <div></div>
        <Link to={"/"} className="logo">
          <img src={logo} />
        </Link>
        <div className="navLinks">
          <Link to={"/login"} className="userLogo">
            <FontAwesomeIcon icon={faUser} size={"2x"} />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
