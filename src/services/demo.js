import { todayISO } from "../domain/wellbeing";
export function demoRecords() {
  const moods = [3, 4, 3, 2, 4, 4, 5, 3, 4, 3, 4, 5, 4, 4];
  return moods.map((mood, i) => {
    const date = new Date(`${todayISO()}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() - (13 - i));
    return {
      id: `demo-${i}`,
      date: date.toISOString().slice(0, 10),
      mood,
      stress: [3, 2, 3, 4, 2, 2, 1][i % 7],
      sleep: [3, 4, 3, 2, 4, 4, 5][i % 7],
      energy: [3, 4, 3, 2, 4, 3, 4][i % 7],
      activity: i % 3 ? 30 : 0,
      notes:
        i === 13
          ? "Um dia tranquilo. Encontrei um tempo para caminhar e colocar as ideias no papel."
          : "",
    };
  });
}
