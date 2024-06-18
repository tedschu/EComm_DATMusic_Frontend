// Persistent nav bar with logo / site name and user icon
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <h1>This is the nav bar</h1>
      <Link to ="/login">Login</Link>
      <Link to ={"/register"}>Register</Link>
      <Link to ={"/account"}>Account</Link>
    </>
  );
}

export default Nav;
