import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
    text,
    date
} from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    password: varchar("password", {length: 255}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    title: varchar("title", {length: 255}).notNull(),
    amount: integer("amount").notNull(),
    category: varchar("category", {length: 100}).notNull(),
    date: date("date").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(), 
});