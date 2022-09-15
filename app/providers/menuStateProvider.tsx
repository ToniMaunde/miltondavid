import { useState, createContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export enum Menu {
  OPEN = "open",
  CLOSED = "closed"
};

type MenuStateContextType = {
  menuState: Menu;
  setMenuState: Dispatch<SetStateAction<Menu>>;
};

export const MenuStateContext = createContext<MenuStateContextType>(undefined as unknown as MenuStateContextType);

export function MenuStateProvider ({ children }: { children: ReactNode}) {
  const [menuState, setMenuState] = useState<Menu>(Menu.CLOSED);
  return (
    <MenuStateContext.Provider value={{menuState, setMenuState}}>
      {children}
    </MenuStateContext.Provider>
  );
};

export function changeMenuState(menuState: Menu, setMenuState: Dispatch<SetStateAction<Menu>>) {
  if (menuState === Menu.OPEN) {
    setMenuState(Menu.CLOSED);
  } else {
    setMenuState(Menu.OPEN);
  }
}