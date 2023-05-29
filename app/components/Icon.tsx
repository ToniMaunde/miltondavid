type SVGPresentationAttributes = {
  clipPath?: string;
  clipRule?: string | number | undefined;
  color?: string;
  fill?: string;
  fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
  stroke?: string;
  strokeLineCap?: "butt" | "round" | "square";
};

type SVGPathEl = {
  d: string;
  id?: string;
  attributes?: SVGPresentationAttributes;
};

type SVGRectangleEl = {
  width: string;
  height: string;
  x: string;
  y: string;
  rx?: string;
  ry?: string;
  attributes: SVGPresentationAttributes;
};

type SVGGroupEl = {
  attributes?: SVGPresentationAttributes;
  paths?: Array<SVGPathEl>;
  rects?: Array<SVGRectangleEl>;
  groups?: Array<SVGGroupEl>;
};

export type TIcon = {
  viewBox: string;
  groups?: Array<SVGGroupEl>;
  paths?: Array<SVGPathEl>;
  title?: string;
  className?: string;
  id?: string;
}

export function Icon(props: TIcon) {
  const { viewBox, groups, paths, className, title, id } = props;

  function renderPath(path: SVGPathEl, index: number): JSX.Element {
    return (
      <path
        key={index}
        id={path.id}
        d={path.d}
        fillRule={path?.attributes?.fillRule}
        clipRule={path?.attributes?.clipRule}
        stroke={path?.attributes?.stroke}
        strokeLinecap={path?.attributes?.strokeLineCap}
      />
    );
  }

  function renderRect(rect: SVGRectangleEl, index: number): JSX.Element {
    return (
      <rect
        key={index}
        width={rect.width}
        height={rect.height}
        x={rect.x}
        y={rect.y}
        rx={rect.rx}
        ry={rect.ry}
        fill={rect.attributes.fill}
      />
    );
  }

  return (
    <svg 
      viewBox={viewBox} 
      id={id} 
      className={`icon ${className || ""}`}>
      <title id="title" lang="en">{title}</title>
      {
        paths?.map((path, index) => renderPath(path, index))
      }
      {
        groups?.map((groupedElements, index) => (
          <g
            key={index}
          >
            {
              groupedElements.paths?.map((path, index) => renderPath(path, index))
            }
            {
              groupedElements.rects?.map((rect, index) => renderRect(rect, index))
            }
          </g>
        ))
      }
    </svg>
  )
}
