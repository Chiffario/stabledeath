import { sqliteTable } from "drizzle-orm/sqlite-core/table";
import { int } from "drizzle-orm/sqlite-core";

export const measurementsTable = sqliteTable("measurements", {
    timestamp: int().primaryKey({ autoIncrement: false }),
    stable: int(),
    lazer: int(),
});
