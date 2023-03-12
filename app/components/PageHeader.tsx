type PageHeaderProps = {
  heading: string;
  paragraph: string;
};

export default function PageHeader(props: PageHeaderProps) {
  const { heading, paragraph } = props;
  return (
    <header className="py-10">
      <h1 className="text-white font-bold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-tight">
        {heading}
      </h1>
      <p className="text-light-gray mt-1">
        {paragraph}
      </p>
    </header>
  )
}
