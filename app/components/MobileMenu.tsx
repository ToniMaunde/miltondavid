import { useContext } from "react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { MenuStateContext, changeMenuState } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

// TODO: Animate this element

export default function MobileMenu() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);

  function handleClick() {
    changeMenuState(menuState, setMenuState);
  };

  return (
    <ul
      className="absolute left-4 right-4 top-14 bg-white flex flex-col rounded p-4 items-center space-y-2 text-gray md:hidden"
    >
      { navLocations.map(({ pathName, name }) => (
        <li
          key={name}
          className={customClasses(pathName, pathname)}
          onClick={handleClick}>
          <Link
            to={pathName}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}