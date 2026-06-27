import { pgTable, uuid, text, timestamp, integer} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const task_categories = pgTable('task_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const task_agreements = pgTable('task_agreements', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    employer_id: uuid('employer_id').notNull().references(() => users.id),
    description: text('description'),
    location: text('location').notNull(),
    agreement_id: uuid('agreement_id').notNull().references(() => task_agreements.id),
    category_id: uuid('category_id').notNull().references(() => task_categories.id),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const categoryRelations = relations(task_categories, ({many}) => ({
    tasks: many(tasks)
}));

export const agreementRelations = relations(task_agreements, ({many}) => ({
    tasks: many(tasks)
}));

export const taskRelations = relations(tasks, ({one}) => ({
    employer: one(users, {
        fields: [tasks.employer_id],
        references: [users.id]
    }),
    category: one(task_categories, {
        fields: [tasks.category_id],
        references: [task_categories.id]
    }),
    agreement: one(task_agreements, {
        fields: [tasks.agreement_id],
        references: [task_agreements.id]
    })
}));

export const userRelations = relations(users, ({many}) => ({
    tasks: many(tasks)
}));