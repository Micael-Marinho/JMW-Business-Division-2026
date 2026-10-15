import { readFile } from "node:fs/promises";
import { defineDatabase } from "./database.js";
const { sequelize } = defineDatabase();
try {
  await sequelize.authenticate();
  await sequelize.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (version VARCHAR(100) PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL)",
  );
  const [applied] = await sequelize.query(
    "SELECT version FROM schema_migrations WHERE version = '001_initial'",
  );
  if (applied.length) console.log("Migração 001_initial já aplicada.");
  else {
    const sql = await readFile(
      new URL("./migrations/001_initial.sql", import.meta.url),
      "utf8",
    );
    await sequelize.transaction(async (transaction) => {
      await sequelize.query(sql, { transaction });
      await sequelize.query(
        "INSERT INTO schema_migrations (version, applied_at) VALUES ('001_initial', NOW())",
        { transaction },
      );
    });
    console.log("Migração 001_initial aplicada.");
  }
} catch (err) {
  console.error("Não foi possível aplicar a migração:", err.name);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
