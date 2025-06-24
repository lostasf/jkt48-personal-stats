import { getScheduleIdByDateAndName } from '@/db/queries'
import { IndonesianHumanReadableDate } from '@/types/date'
import data from '@/json/ticketHistory.json'

const main = async () => {
    try {
        const result = await getScheduleIdByDateAndName(
            data[1].showDate as IndonesianHumanReadableDate,
            data[1].name as string
        )

        if (!result) {
            throw new Error('No schedule found in the database.')
        }

        console.log(result)
    } catch (error) {
        console.error(error)
        throw new Error('Failed to run ')
    }
}

void main()
