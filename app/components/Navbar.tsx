import { Link, useLocation } from "@remix-run/react";
import { useContext } from "react";
import MobiLeMenu from "./MobileMenu";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

import logo from "../assets/img/logo.svg";
import { Icon } from "./Icon";
import lineIcon from "~/assets/icons/line";

export default function Navbar() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);
  const menuClass = menuState === Menu.OPEN ? "text-naples-yellow" : "text-baby-powder";
  const lineClass = menuState === Menu.OPEN ? "stroke-naples-yellow" : "stroke-charleston-green";

  function handleClick() {
    if (menuState === Menu.CLOSED) setMenuState(Menu.OPEN);
    else setMenuState(Menu.CLOSED);
  };

  return (
    <nav
      className="flex items-center relative pt-4 lg:pt-8 responsive-inline-padding">
      <Link
        to="/"
        className="text-baby-powder text-lg mr-auto flex items-center"
      >
      <img
        src={logo}
        className="w-8 h-8 mr-2"
        alt="Milton's logo"
      />
        MILTON
        <span
          className="text-naples-yellow font-semibold"
        >
          DAVID
        </span>
      </Link>
      <button
        className={`md:hidden ${menuClass} relative`}
        onClick={handleClick}
      >
        Menu
        <Icon
          {...lineIcon}
          className={`stroke-[3] absolute top-5 ${lineClass}`}
        />
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
