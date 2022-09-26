import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const currentProcess = process.env.NODE_ENV;

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
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        synchronize: false,
        entities: process.env.NODE_ENV === "production" ? ["dist/src/entities/*.js"] : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production" ? ["dist/src/migrations/*.js"] : ["src/migrations/*.ts"],
        subscribers: [],
      });

export default AppDataSource;
