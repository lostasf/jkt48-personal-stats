import { IndonesianHumanReadableDate, ISOStringDate } from "@/types/date";
import { TicketPurchase } from "@/types/scrape";

/*
* Converts a date string in the format "DD Month YYYY" (e.g., "1 Januari 2023")
* to date string (e.g., "2023-01-01").
*
* @param {string} date - The date string in the format "DD Month YYYY".
* @returns {string} The date string in the format "YYYY-MM-DD"
*/
export const indonesianHumanReadableDateToISOString = (date: IndonesianHumanReadableDate): ISOStringDate => {
    const [day, month, year] = date.split(' ')
    const monthMap: { [key: string]: string } = {
        'Januari': '01',
        'Februari': '02',
        'Maret': '03',
        'April': '04',
        'Mei': '05',
        'Juni': '06',
        'Juli': '07',
        'Agustus': '08',
        'September': '09',
        'Oktober': '10',
        'November': '11',
        'Desember': '12'
    }
    const dayWithLeadingZero = day.padStart(2, '0');
    const formattedDate = `${year}-${monthMap[month]}-${dayWithLeadingZero}` as ISOStringDate

    return formattedDate
}

/**
 * Get the lower and upper bound of the ticket date by show date and show time.
 * @param date - The date in Indonesian human-readable format.
 * @param showTime - The show time (either 'SIANG' or 'MALAM').
 * @returns An object containing the lower and upper bounds of the ticket date in Date() format.
 */

export const getLowerAndUpperBoundOfTicketDateByShowDateAndShowTime = (
    date: IndonesianHumanReadableDate,
    showTime: NonNullable<TicketPurchase['showTime']>
) => {
    // If showTime === 'SIANG' -> lowerBound = 12:00:00 GMT+7, upperBound = 14:00:00 GMT+7 inclusive
    // if showTime === 'MALAM' -> upperBound = 15:00:00 GMT+7, upperBound = 19:30:00 GMT+7 inclusive
    const dateInISOString: string = indonesianHumanReadableDateToISOString(date)
    const lowerBound = showTime === 'SIANG' as NonNullable<TicketPurchase['showTime']> ? 'T05:00:00.000Z' : 'T08:00:00.000Z'
    const upperBound = showTime === 'SIANG' as NonNullable<TicketPurchase['showTime']> ? 'T07:00:00.000Z' : 'T12:30:00.000Z'
    

    return {
        lowerBound: new Date(`${dateInISOString}${lowerBound}`),
        upperBound: new Date(`${dateInISOString}${upperBound}`)
    }
}