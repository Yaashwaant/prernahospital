import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const updates = pgTable("updates", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
});

export type UpdateRow = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
};

