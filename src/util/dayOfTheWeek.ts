export function getDayOfTheWeek(dayOfTheWeek: string): number {
  const cleaned = dayOfTheWeek.toLowerCase().trim();

  switch (cleaned) {
    case "monday":
      return 0;
    case "tuesday":
      return 1;
    case "wednesday":
      return 2;
    case "thursday":
      return 3;
    case "friday":
      return 4;
    case "saturday":
      return 5;
    case "sunday":
      return 6;
    default:
      return -1;
  }
}
