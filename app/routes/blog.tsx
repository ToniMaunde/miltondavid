import { useContext, useEffect } from "react";
import { Outlet } from "@remix-run/react";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";

export default function Blog() {
  const { setMenuState } = useContext(MenuStateContext);

  useEffect(() => {
    setMenuState(Menu.CLOSED);
  }, []);

  return (
    <Outlet />
  )
};
