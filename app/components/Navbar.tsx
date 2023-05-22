import { Link, useLocation } from "@remix-run/react";
import { useContext } from "react";
import MobiLeMenu from "./MobileMenu";
import { Icon } from "./Icon";
import closedMenuIcon from "~/assets/icons/closedMenu";
import openMenuIcon from "~/assets/icons/openMenu";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

export default function Navbar() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);

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
        className="md:hidden"
        onClick={handleClick}
      >
        {
          menuState === Menu.OPEN
            ? <Icon {...openMenuIcon} className="stroke-baby-powder w-5 h-5 md:hidden" />
            : <Icon {...closedMenuIcon} className="stroke-baby-powder w-5 h-5 md:hidden" />
        }
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
