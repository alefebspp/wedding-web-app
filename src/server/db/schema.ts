// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  doublePrecision,
  integer,
  boolean
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wedding_${name}`);

export const products = createTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    payment_link: varchar("payment_link"),
    price: doublePrecision("price"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const productsImages = createTable(
  "products_images",
  {
    id: serial("id").primaryKey(),
    path: varchar("path", { length: 256 }),
    product_id: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  }
);

export const guests = createTable(
  "guests",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    children_quantity: integer('children_quantity')
    .notNull(),
    adults_quantity: integer('adults_quantity')
    .notNull(),
    confirmation: boolean('confirmation').notNull(),
    email: varchar("email", {length: 256}),
    phone: integer('phone'),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  }
);

export const guestRelations = relations(guests, ({ many }) => ({
  guestCompanions: many(guestCompanions),
}));

export const guestCompanions = createTable("guest_companions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  guest_id: integer('guest_id')
    .notNull()
    .references(() => guests.id, { onDelete: 'cascade' }),
    createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
})

export const guestCompanionsRelations = relations(guestCompanions, ({ one }) => ({
  guest: one(guests, { fields: [guestCompanions.guest_id], references: [guests.id] }),
}));

export type InserGuest = typeof guests.$inferInsert;
export type InsertGuestCompanin = typeof guestCompanions.$inferInsert;
export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;

