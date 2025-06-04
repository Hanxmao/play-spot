import { Link, NavLink } from "react-router";
import { FaBasketballBall } from "react-icons/fa"; // example icon

const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link to="/" className="normal-case text-xl text-primary flex items-center gap-2">
          <FaBasketballBall className="text-orange-500" size={24} />
          PlaySpot
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active text-primary font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive ? "active text-primary font-bold" : ""
              }
            >
              Map
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/locations"
              className={({ isActive }) =>
                isActive ? "active text-primary font-bold" : ""
              }
            >
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                isActive ? "active text-primary font-bold" : ""
              }
            >
              Saved
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
