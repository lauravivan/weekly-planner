type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <div className="header__subtitle">{subtitle}</div>
    </header>
  );
}
