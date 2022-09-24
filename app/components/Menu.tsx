import { useContext } from "react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";
import { MenuStateContext, changeMenuState } from "~/providers/menuStateProvider";

// TODO: Animate this element

type Location = {
  pathName: string;
  name: string;
};

export default function MobileMenu() {
  const { pathname } = useLocation();
  const { menuState, setMenuState } = useContext(MenuStateContext);

  const locations: Location[] = [
    {
      pathName: "/",
      name: "Home"
    },
    {
      pathName: "/projects",
      name: "Projects"
    },
    {
      pathName: "/blog",
      name: "Blog"
    },
    {
      pathName: "/contact",
      name: "Contact"
    }
  ];

  function customClasses(pathName: string) {
    return clsx({"text-dark font-bold": pathName === pathname})
  };

  function handleClick() {
    changeMenuState(menuState, setMenuState);
  };

  return (
    <ul className="absolute left-4 right-4 top-14 bg-white flex flex-col rounded p-4 items-center space-y-2 text-gray">
      { locations.map(({ pathName, name }) => (
        <li key={name} className={customClasses(pathName)} onClick={handleClick}>
          <Link to={pathName}>{name}</Link>
        </li>
      ))}
    </ul>
  )
}