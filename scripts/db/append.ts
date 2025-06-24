// import { getOneScheduleByDateShowTimeAndName } from '@/db/queries'
// import { IndonesianHumanReadableDate } from '@/types/date'
// import data from '@/json/ticketHistory.json'
// import { TicketShowTime } from '@/types/scrape'

// const main = async () => {
//     try {
//         const firstTicketHistory = data[0]
//         const scheduleId = await getOneScheduleByDateShowTimeAndName(
//             firstTicketHistory.showDate as IndonesianHumanReadableDate,
//             firstTicketHistory.showTime as TicketShowTime,
//             firstTicketHistory.name as string
//         )
        
//         if (!scheduleId) {
//             throw new Error('No schedule found in the database.')
//         }
//         console.log('Schedule ID:', scheduleId)
//     } catch (error) {
//         console.error(error)
//         throw new Error('Failed to run ')
//     }
// }

// void main()
