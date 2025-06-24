import { cache } from "react";
import db from './drizzle'
import { and, lte, gte, ilike } from 'drizzle-orm'
import * as schema from '@/db/schema'

import { IndonesianHumanReadableDate } from '@/types/date'
import { TicketShowTime } from '@/types/scrape'
import { Schedule, TicketHistory } from '@/db/types'

import { getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime } from '@/utils/index'

export const getOneScheduleByDateShowTimeAndName = cache(async (
    date: IndonesianHumanReadableDate,
    showTime: TicketShowTime,
    scheduleName: string
): Promise<Pick<Schedule, 'id'>> => {
    const bounds = getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime(date, showTime)
    if (!bounds) {
        throw new Error('Invalid showTime or date provided')
    }
    const { lowerBound, upperBound } = bounds
    console.log('Fetching schedule with bounds:', { lowerBound, upperBound, scheduleName })
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
