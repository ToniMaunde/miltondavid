import { useContext} from "react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { MenuStateContext, Menu } from "~/providers/menuStateProvider";
import { navLocations } from "~/util/constants";
import { customClasses } from "~/util";

// TODO: Animate this element

export default function MobileMenu() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);
  
  function handleClick() {
    if (menuState === Menu.CLOSED) setMenuState(Menu.OPEN)
    else setMenuState(Menu.CLOSED);
  }

  return (
    <ul
      className="absolute left-4 right-4 top-14 bg-charleston-green grid gap-8 rounded p-10 text-center text-light-gray drop-shadow-md md:hidden"
    >
      { navLocations.map(({ pathName, name }) => (
        <li
          key={name}
          className={`${customClasses(pathName, pathname)}`}
          onClick={handleClick}>
          <Link
            to={pathName}
            className="text-center text-lg"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
