// import { getOneScheduleByDateShowTimeAndName, createTicketHistoryByScheduleId, getAllMembers, getAllSchedules } from '@/db/queries'
// import { TicketType, TicketOperation, TheatreScheduleURL } from '@/types'
// import { TicketHistory, Member, Schedule } from '@/db/types'

// import { IndonesianHumanReadableDate } from '@/types/date'
// import { TicketPurchase } from '@/types/scrape'

// import { getAndExtractScheduleByScheduleId } from '@/scripts/scrape'

// import ticketHistoryData from '@/json/ticketHistory.json'

// // const appendTicketHistoriesToSchedule = async () => {
// //     const mappedTicketHistories: Omit<TicketHistory, 'id'>[] = []

// //     await ticketHistoryData.reduce(async (promise, ticketHistory) => {
// //         await promise
// //         const scheduleId = await getOneScheduleByDateShowTimeAndName(
// //             ticketHistory.showDate as IndonesianHumanReadableDate,
// //             ticketHistory.showTime as NonNullable<TicketPurchase['showTime']>,
// //             ticketHistory.name as string
// //         )

// //         if (!scheduleId) throw new Error(`No schedule found in the database. ${scheduleId} ${ticketHistory.name} ${ticketHistory.showDate} ${ticketHistory.showTime}`)

// //         mappedTicketHistories.push({
// //             operation: ticketHistory.operation as TicketOperation,
// //             ticketType: ticketHistory.ticketType as TicketType,
// //             url: ticketHistory.detailUrl?.replace('https://jkt48.com', ''),
// //             scheduleId: scheduleId.id,
// //         })
// //     }, Promise.resolve())

// //     const res = await createTicketHistoryByScheduleId(mappedTicketHistories)
// //     console.log('Ticket history created successfully:', res)

// //     return res
// // }

// const main = async () => {
//     try {
//         // const members: Member[] = await getAllMembers()
//         // const mappedMembers: Map<Member['name'], Member['id']> = new Map(members.map(e => [e.name, e.id]))
//         // const schedules: Schedule[] = await getAllSchedules()
//         // const scheduleUrlSet: Set<Schedule['url']> = new Set(schedules.map(e => e.url).filter(e => e.startsWith('/theater/')))
//         const scheduleId: TheatreScheduleURL = '/theater/schedule/id/2638?lang=id'
//         await getAndExtractScheduleByScheduleId(scheduleId)

//         // get schedules from db, get schedule url (if event skip) -> scrape member from schedule by schedule url, push to db
//     } catch (error) {
//         console.error(error)
//         throw new Error('Failed to run ')
//     }
// }

// void main()
