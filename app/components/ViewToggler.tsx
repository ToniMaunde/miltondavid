import type { MouseEvent } from "react";
import { Icon } from "./Icon";
import type { TIcon } from "./Icon";
import { iconClasses, textClasses } from "~/util";
import { ViewType } from "~/util";

type ViewTogglerProps = {
  view: ViewType;
  changeView: (event: MouseEvent<HTMLSpanElement>) => void;
  listIcon: TIcon;
  gridIcon: TIcon;
}

export default function ViewToggler(props: ViewTogglerProps) {
  const { view, changeView, listIcon, gridIcon } = props;
  return (
    <section className="flex gap-2">
      <span 
        className="flex cursor-pointer"
        data-view="LIST"
        onClick={changeView}
      >
        <Icon 
          {...listIcon}
          className={iconClasses(view, ViewType.LIST)}
        />
        <span className={textClasses(view, ViewType.LIST)}
        >
          List view
        </span>
      </span>
      <span className="text-phillipine-silver">|</span>
      <span 
        className="flex cursor-pointer"
        data-view="GRID" 
        onClick={changeView}
      >
        <Icon
          {...gridIcon}
          className={iconClasses(view, ViewType.GRID)}
        />
        <span className={textClasses(view, ViewType.GRID)}
        >
          Grid view
        </span>
      </span>
    </section>
  )
}
