import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pt-2 pb-6">
      <li className="navbar__item">
        <NavLink className="navbar-button" to={"/"}>
          All Tapes
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink className="navbar-button" to={"/myrentals"}>
          My Rentals
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink className="navbar-button" to={"/myreviews"}>
          My Reviews
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink className="navbar-button" to={"/myprofile"}>
          My Profile
        </NavLink>
      </li>
      {localStorage.getItem("rare_token") !== null ? (
        <li className="navbar__item">
          <button
            className="delete-button"
            onClick={() => {
              localStorage.removeItem("rare_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}{" "}
    </ul>
  );
};
