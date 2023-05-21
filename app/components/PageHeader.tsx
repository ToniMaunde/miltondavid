type PageHeaderProps = {
  heading: string;
  paragraph: string;
  className?: undefined | string;
};

export default function PageHeader(props: PageHeaderProps) {
  const { heading, paragraph, className } = props;
  return (
    <header className={`responsive-block-padding ${className}`}>
      <h1 className="text-baby-powder font-bold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-tight">
        {heading}
      </h1>
      <p className="text-light-gray mt-1">
        {paragraph}
      </p>
    </header>
  )
}
