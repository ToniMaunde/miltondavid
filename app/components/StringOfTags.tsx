type StringOfTagsProps = {
  searchParamsLength: number;
  numberOfMatches: number;
  searchParamsTags: string[];
}

export default function StringOfTags(props: StringOfTagsProps) {
  const { searchParamsLength, numberOfMatches, searchParamsTags } = props;

  function stringifyTags(tags: string[]) {
    let stringOfTags = "";
    tags.forEach((tag, idx) => {
      if (idx === tags.length - 1) stringOfTags = stringOfTags.concat(tag);
      else stringOfTags= stringOfTags.concat(`${tag}, `);
    });
    return stringOfTags;
  };

  if (searchParamsLength === 0) return null;

  return (
    <p className="px-4 mb-4 text-light-gray">
      {numberOfMatches} results for <span className="text-primary">
      {stringifyTags(searchParamsTags)} </span>
        articles
    </p>
  )
}