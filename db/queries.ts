import { cache } from "react";
import db from './drizzle'
import { and, lte, gte, ilike } from 'drizzle-orm'
import * as schema from '@/db/schema'

import { IndonesianHumanReadableDate } from '@/types/date'
import { TicketPurchase } from '@/types/scrape'
import { Schedule, TicketHistory, Member } from '@/db/types'

import { getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime } from '@/utils/index'

export const getOneScheduleByDateShowTimeAndName = cache(async (
    date: IndonesianHumanReadableDate,
    showTime: NonNullable<TicketPurchase['showTime']>,
    scheduleName: string
): Promise<Pick<Schedule, 'id'>> => {
    const bounds = getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime(date, showTime)
    if (!bounds) throw new Error('Invalid showTime or date provided')

    const { lowerBound, upperBound } = bounds
    const result = await db
        .select({
            id: schema.schedules.id,
        })
        .from(schema.schedules)
        .where(
            and(
                gte(schema.schedules.date, lowerBound),
                lte(schema.schedules.date, upperBound),
                ilike(schema.schedules.name, `%${scheduleName}%`)
            )
        )
        .limit(1)
        .orderBy(schema.schedules.date)
        .catch((error) => {
            console.error('Error fetching schedule:', error)
            throw new Error('Failed to fetch schedule from the database')
        })

    return result[0] || null
})

export const createTicketHistoryByScheduleId = cache(async (
    ticketHistories: Omit<TicketHistory, 'id'>[] = []
) => {
    const createdTicketHistory = await db
        .insert(schema.ticketHistories)
        .values(ticketHistories)
        .returning()
        .catch((error) => {
            console.error('Error creating ticket history:', error)
            throw new Error('Failed to create ticket history in the database')
        })

    return createdTicketHistory
})

export const getAllMembers = cache(async (
): Promise<Member[]> => {
    const result  = await db
        .select()
        .from(schema.members)
        .orderBy(schema.members.name)
        .catch((error) => {
            console.error('Error fetching members:', error)
            throw new Error('Failed to fetch members from the database')
        })
    
    return result.map(member => ({
        ...member,
        url: member.url as Member['url']
    }))
})

export const getAllSchedules = cache(async (
): Promise<Schedule[]> => {
    const result = await db
        .select()
        .from(schema.schedules)
        .orderBy(schema.schedules.date)
        .catch((error) => {
            console.error('Error fecthing schedules:', error)
            throw new Error('Failed to fetch schedules from the database')
        })
    
    return result.map(schedule => ({
        ...schedule,
        url: schedule.url as Schedule['url']
    }))
})
