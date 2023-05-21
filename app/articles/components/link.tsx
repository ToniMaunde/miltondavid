import * as React from "react";

type LinkProps = {
  href: string;
  text: string;
};

export default function ArticleLink(props: LinkProps) {
  const { href, text } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-baby-powder lg:hover:text-naples-yellow underline"
    >
      {text}
    </a>
  )
};
