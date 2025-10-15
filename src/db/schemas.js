import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

export const gold = pgTable('gold', {
    id: serial('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    amount: integer('amount').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
});

const tags = pgTable('tags', {
    id: serial('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
    gold: many(gold),
}));

export const goldRelations = relations(gold, ({ one, many }) => ({
    user: one(users, {
        fields: [gold.userId],
        references: [users.id],
    }),
    tags: many(tags),
}));
