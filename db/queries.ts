import db from './drizzle'
import { and, lt, gte, ilike } from 'drizzle-orm'
import * as schema from '@/db/schema'

import { IndonesianHumanReadableDate } from '@/types/date'

import { getStartAndEndOfDayFromDate } from '@/utils'

export const getScheduleIdByDateAndName = async (
    date: IndonesianHumanReadableDate,
    scheduleName: string
) => {
    const { startOfDay, startOfNextDay } = getStartAndEndOfDayFromDate(date)

    const result = await db
        .select({
            id: schema.schedules.id,
        })
        .from(schema.schedules)
        .where(
            and(
                gte(schema.schedules.date, startOfDay),
                lt(schema.schedules.date, startOfNextDay),
                ilike(schema.schedules.name, `%${scheduleName}%`)
            )
        )

    return result
}
