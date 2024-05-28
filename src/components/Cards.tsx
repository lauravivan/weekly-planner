import { Card } from "./index";

export function Cards() {
  return (
    <main className="cards">
      <Card dayOfTheWeek="monday"></Card>
      <Card dayOfTheWeek="tuesday"></Card>
      <Card dayOfTheWeek="wednesday"></Card>
      <Card dayOfTheWeek="thursday"></Card>
      <Card dayOfTheWeek="friday"></Card>
      <Card dayOfTheWeek="saturday"></Card>
      <Card dayOfTheWeek="sunday"></Card>
    </main>
  );
}
