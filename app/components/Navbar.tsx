import { Link, useLocation } from "@remix-run/react";
import { useContext } from "react";
import MobiLeMenu from "./MobileMenu";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

export default function Navbar() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);
  const menuClass = menuState === Menu.OPEN ? "text-naples-yellow" : "text-baby-powder";

  function handleClick() {
    if (menuState === Menu.CLOSED) setMenuState(Menu.OPEN);
    else setMenuState(Menu.CLOSED);
  };

  return (
    <nav
      className="flex items-center relative pt-4 lg:pt-8 responsive-inline-padding">
      <Link
        to="/"
        className="text-baby-powder text-lg mr-auto"
      >
        MILTON
        <span
          className="text-naples-yellow font-semibold"
        >
          DAVID
        </span>
      </Link>
      <button
        className={`md:hidden ${menuClass}`}
        onClick={handleClick}
      >
        Menu
      </button>
      {menuState === Menu.OPEN && <MobiLeMenu />}
      <ul
        className="hidden md:flex gap-[3vw] text-light-gray"
      >
        {
          navLocations.map(({ pathName, name }) => (
            <li
              key={name}
              onClick={handleClick}
            >
              <Link
                to={pathName}
                className={`navbar-link ${customClasses(pathName, pathname)}`}
              >
                {name}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
