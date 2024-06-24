// Persistent nav bar with logo / site name and user icon
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.jpeg";


function Nav({isLoggedIn}) {
  return (
    <>
      <nav>
        <div></div>
        <Link to={"/"} className="logo">
          <img src={logo} />
        </Link>
        <div className="navLinks">
          {!isLoggedIn && ( <Link to={"/login"} className="userLogo">
            <FontAwesomeIcon icon={faUser} size={"2x"} />
          </Link>)}
          {isLoggedIn && <Link to="/account">My Account</Link>}
          <Link to={"/cart"} className="cartLogo">
            <FontAwesomeIcon icon={faCartShopping} size={"2x"} />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
