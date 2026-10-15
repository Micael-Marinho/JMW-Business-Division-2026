import { Sequelize, DataTypes } from "sequelize";
export function defineDatabase(
  connection = process.env.DATABASE_URL,
  dialectModule,
) {
  if (!connection) throw new Error("Configure DATABASE_URL no arquivo .env.");
  const sequelize = new Sequelize(connection, {
    dialect: "postgres",
    dialectModule,
    logging: false,
  });
  const common = { timestamps: false, underscored: true };
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.STRING(80),
      email: { type: DataTypes.STRING(254), unique: true },
      passwordHash: DataTypes.TEXT,
      consentVersion: DataTypes.STRING(32),
      createdAt: DataTypes.DATE,
    },
    { ...common, tableName: "users" },
  );
  const Session = sequelize.define(
    "Session",
    {
      tokenHash: { type: DataTypes.STRING(64), primaryKey: true },
      userId: DataTypes.UUID,
      expiresAt: DataTypes.DATE,
    },
    { ...common, tableName: "sessions" },
  );
  const Checkin = sequelize.define(
    "Checkin",
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      userId: DataTypes.UUID,
      date: DataTypes.DATEONLY,
      mood: DataTypes.INTEGER,
      stress: DataTypes.INTEGER,
      sleep: DataTypes.INTEGER,
      energy: DataTypes.INTEGER,
      activity: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
    },
    { ...common, tableName: "checkins" },
  );
  const Diary = sequelize.define(
    "Diary",
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      userId: DataTypes.UUID,
      title: DataTypes.STRING(100),
      body: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
    },
    { ...common, tableName: "diaries" },
  );
  return { sequelize, User, Session, Checkin, Diary };
}
