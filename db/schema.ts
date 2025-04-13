import { relations } from 'drizzle-orm'
import {
  pgTable,
  uuid,
  text,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', { // STS, Cara Meminum Ramune, RKJ (all setlist/event), etc.
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
})

export const members = pgTable('members', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    memberUrl: text('memberUrl').notNull(),
})

export const schedules = pgTable('schedules', { // from https://jkt48.com/calendar/list?lang=id
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    date: timestamp('date').notNull(),
    href: text('href').notNull(),
    stsMember: uuid('stsMember').references(() => members.id), // STS member if any
})

export const categoriesRelations = relations(categories, ({ many }) => ({
    schedulesToCategories: many(schedulesToCategories),
    membersToCategories: many(membersToCategories),
}))

export const membersRelations = relations(members, ({ many }) => ({
    membersToSchedules: many(membersToSchedules),
    membersToCategories: many(membersToCategories),
}))

export const schedulesRelations = relations(schedules, ({ many }) => ({
    schedulesToCategories: many(schedulesToCategories),
    membersToSchedules: many(membersToSchedules),
}))

export const schedulesToCategories = pgTable('schedules_to_categories', {
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
    categoryId: uuid('categoryId').notNull().references(() => categories.id),
},
    (t) => [
    primaryKey({ columns: [t.scheduleId, t.categoryId] })
])

export const membersToSchedules = pgTable('members_to_schedules', { // members can have multiple schedules and vice versa
    memberId: uuid('memberId').notNull().references(() => members.id),
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
},
    (t) => [
    primaryKey({ columns: [t.memberId, t.scheduleId] })
])

export const membersToCategories = pgTable('members_to_categories', { // members can have multiple categories and vice versa
    memberId: uuid('memberId').notNull().references(() => members.id),
    categoryId: uuid('categoryId').notNull().references(() => categories.id),
},
    (t) => [
    primaryKey({ columns: [t.memberId, t.categoryId] })
])

export const schedulesToCategoriesRelations = relations(schedulesToCategories, ({ one }) => ({
    schedule: one(schedules, { fields: [schedulesToCategories.scheduleId], references: [schedules.id] }),
    category: one(categories, { fields: [schedulesToCategories.categoryId], references: [categories.id] }),
}))

export const membersToSchedulesRelations = relations(membersToSchedules, ({ one }) => ({
    member: one(members, { fields: [membersToSchedules.memberId], references: [members.id] }),
    schedule: one(schedules, { fields: [membersToSchedules.scheduleId], references: [schedules.id] }),
}))

export const membersToCategoriesRelations = relations(membersToCategories, ({ one }) => ({
    member: one(members, { fields: [membersToCategories.memberId], references: [members.id] }),
    category: one(categories, { fields: [membersToCategories.categoryId], references: [categories.id] }),
}))