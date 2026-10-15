import { defineDatabase } from "./database.js";
import { createApp } from "./app.js";
const db = defineDatabase();
await db.sequelize.authenticate();
const port = Number(process.env.PORT || 3001);
const server = createApp(db).listen(port, "127.0.0.1", () =>
  console.log(`MindTrack API: http://localhost:${port}`),
);
async function stop() {
  server.close();
  await db.sequelize.close();
  process.exit(0);
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
