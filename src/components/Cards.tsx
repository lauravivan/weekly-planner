import { Card } from "./index";

export function Cards() {
  return (
    <main className="cards">
      <Card dayOfTheWeek="monday" />
      <Card dayOfTheWeek="tuesday" />
      <Card dayOfTheWeek="wednesday" />
      <Card dayOfTheWeek="thursday" />
      <Card dayOfTheWeek="friday" />
      <Card dayOfTheWeek="saturday" />
      <Card dayOfTheWeek="sunday" />
    </main>
  );
}
