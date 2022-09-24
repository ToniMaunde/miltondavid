import { Link } from "@remix-run/react";
import { useContext } from "react";
import MobiLeMenu from "./Menu";
import { Icon } from "./Icon";
import closedMenuIcon from "~/assets/icons/closedMenu";
import openMenuIcon from "~/assets/icons/openMenu";
import { Menu, MenuStateContext, changeMenuState } from "~/providers/menuStateProvider";

export default function Navbar() {
  const { menuState, setMenuState } = useContext(MenuStateContext);

  function handleClick() {
    changeMenuState(menuState, setMenuState);
  };

  return (
    <nav className="flex items-center p-4 relative">
      <Link to="/" className="text-white text-lg mr-auto">MILTON<span className="text-primary font-semibold">
        DAVID</span>
      </Link>
      <button onClick={handleClick}>
        {
          menuState === Menu.OPEN
            ? <Icon {...openMenuIcon} customClasses="stroke-white w-5 h-5"/>
            : <Icon {...closedMenuIcon} customClasses="stroke-white w-5 h-5"/>
        }
      </button>
      { menuState === Menu.OPEN && <MobiLeMenu /> }
    </nav>
  )
}