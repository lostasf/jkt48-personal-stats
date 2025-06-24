import { getOneScheduleByDateShowTimeAndName, createTicketHistoryByScheduleId } from '@/db/queries'

import { IndonesianHumanReadableDate } from '@/types/date'
import { TicketShowTime } from '@/types/scrape'

import data from '@/json/ticketHistory.json'
import { TicketHistory, TicketType, TicketOperation } from '@/db/types'

const main = async () => {
    try {
        const mappedTicketHistories: Omit<TicketHistory, 'id'>[] = []

        await data.reduce(async (promise, ticketHistory) => {
            await promise
            const scheduleId = await getOneScheduleByDateShowTimeAndName(
                ticketHistory.showDate as IndonesianHumanReadableDate,
                ticketHistory.showTime as TicketShowTime,
                ticketHistory.name as string
            )

            if (!scheduleId) throw new Error(`No schedule found in the database. ${scheduleId} ${ticketHistory.name} ${ticketHistory.showDate} ${ticketHistory.showTime}`)

            mappedTicketHistories.push({
                operation: ticketHistory.operation as TicketOperation,
                ticketType: ticketHistory.ticketType as TicketType,
                url: ticketHistory.detailUrl?.replace('https://jkt48.com', ''),
                scheduleId: scheduleId.id,
            })
        }, Promise.resolve())

        const res = await createTicketHistoryByScheduleId(mappedTicketHistories)

        console.log('Ticket history created successfully:', res)

    } catch (error) {
        console.error(error)
        throw new Error('Failed to run ')
    }
}

void main()
