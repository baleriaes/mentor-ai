type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-5xl font-bold text-white">
        {title}
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}