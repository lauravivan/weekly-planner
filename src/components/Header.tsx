type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header>
      <div>{title}</div>
      <div>{subtitle}</div>
    </header>
  );
}
