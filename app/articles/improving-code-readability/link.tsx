import * as React from "react";

type LinkProps = {
  href: string;
  text: string;
};

export default function ArticlesLink(props: LinkProps) {
  const { href, text } = props;
  return (
    <a href={href} target="_blank" rel="noreferrer" >{text}</a>
  )
};