type CardProps = {
  dayOfTheWeek: string;
};

export function Card({ dayOfTheWeek }: CardProps) {
  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content"></div>
    </div>
  );
}
