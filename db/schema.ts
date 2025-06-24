import { relations } from 'drizzle-orm'
import {
    pgTable,
    uuid,
    text,
    timestamp,
    primaryKey,
    index,
} from 'drizzle-orm/pg-core'

/**
 * Initialize Tables for JKT48 Schedules, Members, and Categories
 */
export const categories = pgTable('categories', { // STS, Cara Meminum Ramune, RKJ (all setlist/event), etc.
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull()
}, (t) => {
    return {
        nameIdx: index('category_name_idx').on(t.name),
    }
})

export const members = pgTable('members', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    url: text('url').notNull(),
}, (t) => {
    return {
        nameIdx: index('member_name_idx').on(t.name),
    }
})

export const schedules = pgTable('schedules', { // from https://jkt48.com/calendar/list?lang=id
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull(), // STRICTLY UTC
    url: text('url').notNull(),
    stsMemberId: uuid('stsMemberId').references(() => members.id),
}, (t) => {
    return {
        dateIdx: index('schedule_date_idx').on(t.date),
        stsMemberIdx: index('schedule_sts_member_idx').on(t.stsMemberId),
    }
})

export const ticketHistories = pgTable('ticketHistories', {
    id: uuid('id').primaryKey().defaultRandom(),
    operation: text('name').notNull(),
    ticketType: text('ticketType').notNull(), // OFC or General
    url: text('url'),
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
    seatNumber: text('seatNumber')
}, (t) => {
    return {
        operationIdx: index('ticket_history_operation_idx').on(t.operation),
        ticketTypeIdx: index('ticket_history_ticket_type_idx').on(t.ticketType),
        scheduleIdIdx: index('ticket_history_schedule_id_idx').on(t.scheduleId),
        seatNumberIdx: index('ticket_history_seat_number_idx').on(t.seatNumber),
    }
})

/**
 * Initialize Relations for JKT48 Schedules, Members, and Categories
 */

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

export const ticketHistoriesRelations = relations(ticketHistories, ({ one }) => ({
    ticketHistoryToSchedules: one(ticketHistoryToSchedules)
}))

/**
 * Initialize Many-to-Many Relations for JKT48 Schedules, Members, and Categories
 */

export const schedulesToCategories = pgTable('schedules_to_categories', {
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
    categoryId: uuid('categoryId').notNull().references(() => categories.id),
},
    (t) => [
    primaryKey({ columns: [t.scheduleId, t.categoryId] }),
    index('schedules_to_categories_schedule_id_idx').on(t.scheduleId),
    index('schedules_to_categories_category_id_idx').on(t.categoryId),
])

export const membersToSchedules = pgTable('members_to_schedules', { // members can have multiple schedules and vice versa
    memberId: uuid('memberId').notNull().references(() => members.id),
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
},
    (t) => [
    primaryKey({ columns: [t.memberId, t.scheduleId] }),
    index('members_to_schedules_member_id_idx').on(t.memberId),
    index('members_to_schedules_schedule_id_idx').on(t.scheduleId),
])

export const membersToCategories = pgTable('members_to_categories', { // members can have multiple categories and vice versa
    memberId: uuid('memberId').notNull().references(() => members.id),
    categoryId: uuid('categoryId').notNull().references(() => categories.id),
},
    (t) => [
    primaryKey({ columns: [t.memberId, t.categoryId] }),
    index('members_to_categories_member_id_idx').on(t.memberId),
    index('members_to_categories_category_id_idx').on(t.categoryId),
    ])

export const ticketHistoryToSchedules = pgTable('ticketHistories_to_schedules', {
    ticketHistoryId: uuid('ticketHistoryId').notNull().references(() => ticketHistories.id),
    scheduleId: uuid('scheduleId').notNull().references(() => schedules.id),
},
    (t) => [
    primaryKey({ columns: [t.ticketHistoryId, t.scheduleId] }),
    index('ticket_histories_to_schedules_ticket_history_id_idx').on(t.ticketHistoryId),
    index('ticket_histories_to_schedules_schedule_id_idx').on(t.scheduleId),
    ])

/**
 * Initialize Relations for Many-to-Many Relations
 */

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

export const ticketHistoryToSchedulesRelations = relations(ticketHistoryToSchedules, ({ one }) => ({
    ticketHistory: one(ticketHistories, { fields: [ticketHistoryToSchedules.ticketHistoryId], references: [ticketHistories.id] }),
    schedule: one(schedules, { fields: [ticketHistoryToSchedules.scheduleId], references: [schedules.id] }),
}))