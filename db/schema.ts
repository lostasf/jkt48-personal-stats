import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const schedules = pgTable('schedules', { // from https://jkt48.com/calendar/list?lang=id
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    date: timestamp('date').notNull(),
    href: text('href').notNull(),
    stsMember: integer('stsMember').references(() => members.id), // STS member if any
})

export const schedulesRelations = relations(schedules, ({ many }) => ({
    schedulesToCategories: many(schedulesToCategories),
    schedulesToMembers: many(schedulesToMembers),
}))
  
export const categories = pgTable('categories', { // STS, Cara Meminum Ramune, RKJ (all setlist/event), etc.
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
    schedulesToCategories: many(schedulesToCategories),
}))

export const schedulesToCategories = pgTable('schedules_to_categories', {
    scheduleId: integer('scheduleId').notNull().references(() => schedules.id),
    categoryId: integer('categoryId').notNull().references(() => categories.id),
},
    (t) => [
    primaryKey({ columns: [t.scheduleId, t.categoryId] })
])

export const schedulesToCategoriesRelations = relations(schedulesToCategories, ({ one }) => ({
    schedule: one(schedules, { fields: [schedulesToCategories.scheduleId], references: [schedules.id] }),
    category: one(categories, { fields: [schedulesToCategories.categoryId], references: [categories.id] }),
}))

export const members = pgTable('members', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    memberUrl: text('memberUrl').notNull(),
})

export const membersRelations = relations(members, ({ many }) => ({
    schedulesToMembers: many(schedulesToMembers),
}))

export const schedulesToMembers = pgTable('schedules_to_members', { // members can have multiple schedules and vice versa
    scheduleId: integer('scheduleId').notNull().references(() => schedules.id),
    memberId: integer('memberId').notNull().references(() => members.id),
},
    (t) => [
    primaryKey({ columns: [t.scheduleId, t.memberId] })
])

export const schedulesToMembersRelations = relations(schedulesToMembers, ({ one }) => ({
    schedule: one(schedules, { fields: [schedulesToMembers.scheduleId], references: [schedules.id] }),
    member: one(members, { fields: [schedulesToMembers.memberId], references: [members.id] }),
}))