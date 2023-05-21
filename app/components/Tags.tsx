import type { MouseEvent } from "react";
import type { URLSearchParams } from "url";
import { isTagSelected } from "~/util";

type TagsProps = {
  tags: string[];
  searchParams: URLSearchParams
  handleFilter: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Tags(props: TagsProps) {
  const { tags, searchParams, handleFilter } = props;
  return (
    <ul className="mb-8 flex flex-wrap justify-start gap-5">
      { tags.map((tag, idx) => (
          <li key={`${tag}-${idx}`}>
            <button
              value={tag}
              onClick={handleFilter}
              className={isTagSelected(tag, searchParams)}
            >
              {tag}
            </button>
          </li>
        ))
      }
    </ul>
  )
}
