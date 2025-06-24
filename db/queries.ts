import db from './drizzle'
import { and, lt, gte, ilike } from 'drizzle-orm'
import * as schema from '@/db/schema'

import { IndonesianHumanReadableDate } from '@/types/date'
import { Schedule, TicketHistory } from '@/db/types'
import { TicketShowTime } from '@/types/scrape'

import { indonesianHumanReadableDateToISOString } from '@/utils/index'

const getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime = (
    date: IndonesianHumanReadableDate,
    showTime: TicketShowTime
) => {
    // If showTime === 'SIANG' -> lowerBound = 12:00:00 GMT+7, upperBound = 14:00:00 GMT+7 inclusive
    // if showTime === 'MALAM' -> upperBound = 15:00:00 GMT+7, upperBound = 19:30:00 GMT+7 inclusive
    
    const dateInISOString: string = indonesianHumanReadableDateToISOString(date)
    if (showTime === 'SIANG' as TicketShowTime) {
        return {
            lowerBound: `${dateInISOString}T05:00:00.000Z`,
            upperBound: `${dateInISOString}T07:00:00.000Z`
        }
    } else if (showTime === 'MALAM' as TicketShowTime) {
        return {
            lowerBound: `${dateInISOString}T08:00:00.000Z`,
            upperBound: `${dateInISOString}T12:30:00.000Z`
        }
    }

    return null
}

export const getOneScheduleByDateShowTimeAndName = async (
    date: IndonesianHumanReadableDate,
    showTime: TicketShowTime,
    scheduleName: string
): Promise<Array<Pick<Schedule, 'id'>>> => {
    const bounds = getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime(date, showTime)
    if (!bounds) {
        throw new Error('Invalid showTime or date provided')
    }
    const { lowerBound, upperBound } = bounds
    const result = await db
        .select({
            id: schema.schedules.id,
        })
        .from(schema.schedules)
        .where(
            and(
                gte(schema.schedules.date, new Date(lowerBound)),
                lt(schema.schedules.date, new Date(upperBound)),
                ilike(schema.schedules.name, `%${scheduleName}%`)
            )
        )
        .limit(1)
        .orderBy(schema.schedules.date)
    

    return result
}

export const createTicketHistoryByScheduleId = async (
    ticketHistory: Omit<TicketHistory, 'id'>[] = []
) => {
    const createdTicketHistory = await db
        .insert(schema.ticketHistories)
        .values(ticketHistory)
        .returning()

    return createdTicketHistory
}
