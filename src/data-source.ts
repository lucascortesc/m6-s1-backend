import { DataSource } from "typeorm";
import "reflect-metadata";

const currentProcess = process.env.NODE_ENV;
const host = currentProcess === "migration" ? "localhost" : "db_health";

const AppDataSource =
  currentProcess === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.entity.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        synchronize: false,
        entities: ["src/entities/*ts"],
        migrations: ["src/migrations/*.ts"],
      });

export default AppDataSource;