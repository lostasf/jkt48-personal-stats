import db  from './drizzle'
import { and, lt, gte, ilike } from 'drizzle-orm'
import * as schema from '@/db/schema'

import { getStartAndEndOfDayFromDate } from '@/utils'

export const getScheduleIdByDateAndName = async (date: string, name: string) => {
    const { startOfDay, startOfNextDay } = getStartAndEndOfDayFromDate(date)

    const result = await db
        .select({
            id: schema.schedules.id
        })
        .from(schema.schedules)
        .where(
            and(
                gte(schema.schedules.date, startOfDay),
                lt(schema.schedules.date, startOfNextDay),
                ilike(schema.schedules.name, `%${name}%`)
            )
        )
    
    return result
}