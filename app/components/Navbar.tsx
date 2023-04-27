import { Link, useLocation } from "@remix-run/react";
import { useContext } from "react";
import MobiLeMenu from "./MobileMenu";
import { Icon } from "./Icon";
import closedMenuIcon from "~/assets/icons/closedMenu";
import openMenuIcon from "~/assets/icons/openMenu";
import { Menu, MenuStateContext, changeMenuState } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

export default function Navbar() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);

  function handleClick() {
    changeMenuState(menuState, setMenuState);
  };

  return (
    <nav
      className="flex items-center relative pt-4 px-4 md:pt-8 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
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
        className="hidden md:flex gap-14 text-light-gray"
      >
        {
          navLocations.map(({ pathName, name }) => (
            <li
              key={name}
              className={customClasses(pathName, pathname)}
              onClick={handleClick}
            >
              <Link
                to={pathName}
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
