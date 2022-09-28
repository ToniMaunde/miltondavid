type AnimationName = {
  name: "loading" | "success";
  className?: string | undefined;
};

export default function Animation(props: AnimationName) {
  const { name, className } = props;
  return (
    <div className={`${name} ${className}`}></div>
  )
}